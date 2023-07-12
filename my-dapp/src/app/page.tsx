"use client";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";
import { personal, web3 } from "./lib/client";
import MINT_NFT_ABI from "./lib/MINT_NFT_ABI.json";
import MINT_NFT_BYTECODE from "./lib/MINT_NFT_BYTECODE";
import ContractCard, { ContractCardProps } from "@/components/ContractCard";

const Home: NextPage = () => {
  const [account, setAccount] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [contracts, setContracts] = useState<ContractCardProps[]>();

  // 컨트랙트 조회하기
  const getContracts = async () => {
    try {
      const signedToken = localStorage.getItem("signedToken");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/contract?signed-token=${signedToken}`
      );

      setContracts(response.data.contracts);

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // 이메일 입력 받아서 메타메스크로 로그인
  const onSubmitMetamask: FormEventHandler = async (e) => {
    try {
      e.preventDefault();

      // 이메일 없으면 실행 안되게
      if (!email) return;

      // 메타마스크 로그인
      // next-env.d.ts에서 Window interface 만들어서 ethereum: any 로 타입 설정하기
      const accounts = await window.ethereum?.request({
        method: "eth_requestAccounts",
      });

      // 메타마스크 로그인 해서 지갑주소 있으면
      if (accounts) {
        // 지갑주소 변수에 담기
        setAccount(accounts[0]);

        // 서명 요청
        // 첫번째 값 data 중요! 한 글자라도 틀리면 다른 값이 나옴
        const signedToken = await personal.sign(
          `Welcome!\n\n\n${uuidv4()}`,
          accounts[0],
          "Pass"
        );
        // console.log(signedToken);

        // 서명된 값 기준으로 지갑주소 꺼내오기 (복호화) -> ecRecover 사용 X (값이 계속 변경됨)

        // axios로 POST 요청 보내기
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_URL}/api/user`,
          {
            account: accounts[0],
            email, // 키, 벨류가 이름이 같아 합쳐서
            signedToken,
          }
        );
        console.log(response);

        // localStorage에 signedToken 저장
        // - 클라이언트에 저장된 토큰이 유출될 경우 db 접근해서 악의적 행동 가능해짐 -> uuid 사용
        localStorage.setItem("signedToken", signedToken);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 컨트랙트 배포하기
  const onSubmitDeploy: FormEventHandler = async (e) => {
    try {
      e.preventDefault();

      // 지갑 주소 없거나 받아야할 데이터 없으면 실행 안되게
      if (!account || !name || !symbol) return;

      // localStorage에서 signedToken 가져오기
      const signedToken = localStorage.getItem("signedToken");

      const userCheckRes = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/user?signed-token=${signedToken}`
      );

      if (userCheckRes.data.ok) {
        const contract = new web3.eth.Contract(MINT_NFT_ABI);

        // arguments 순서 중요!!
        // arguments 밑줄이 뜨지만 실행에는 상관없음. @ts-expect-error : type체킹 기능 무시하는 주석
        const deployRes = await contract
          .deploy({
            data: MINT_NFT_BYTECODE,
            //  @ts-expect-error
            arguments: [
              name,
              symbol,
              "https://olbm.mypinata.cloud/ipfs/QmU52T5t4bXtoUqQYStgx39DdXy3gLQq7KDuF1F9g3E9Qy",
              1000,
            ],
          })
          .send({ from: account });

        // 배포 주소 확인
        if (deployRes["_address"]) {
          console.log(deployRes["_address"]);

          // 컨트랙트 데이터 보내기 (address, signedToken)
          const contractRes = await axios.post(
            `${process.env.NEXT_PUBLIC_URL}/api/contract`,
            {
              address: deployRes["_address"],
              signedToken,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // 콘솔에 출력해서 확인
          console.log(contractRes);
        }

        console.log(deployRes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // form 입력 확인
  useEffect(() => {
    console.log(email);
  }, [email]);

  // 컨트랙트 조회 함수 실행
  useEffect(() => {
    if (!account) return;

    getContracts();
  }, [account]);

  return (
    <div className="bg-red-100 min-h-screen p-24">
      <div>
        <form onSubmit={onSubmitMetamask}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="ml-2 px-2 py-1 border-2 border-black rounded-md"
            type="submit"
            value="메타마스크 로그인"
          />
        </form>
        <form className="mt-2" onSubmit={onSubmitDeploy}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="ml-2"
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          <input type="submit" value="스마트컨트랙트배포" />
        </form>
        <ul>
          {contracts?.map((v, i) => (
            <ContractCard key={i} address={v.address} user={v.user} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
