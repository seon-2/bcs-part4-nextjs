"use client";

import { mintNftContract, SALE_NFT_ADDRESS } from "../lib/web3.config";
import { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../layout";
import { redirect } from "next/navigation"; // 수동으로 입력 필요 (자동완성 X)
import NftCard from "../components/NftCard";

const MyNft: NextPage = () => {
  // 내가 가진 nft 보여주는 기능
  // solidity의 getAllNft 함수 사용 (주소값 넣고 uint[] 반환함)
  const { account } = useContext(AppContext);
  const [tokenIds, setTokenIds] = useState<number[]>();
  const [saleStatus, setSaleStatus] = useState<boolean>(false);

  const getMyNfts = async () => {
    try {
      const response: bigint[] = await mintNftContract.methods
        .getAllNft(account)
        .call();

      // 숫자형 배열로 만들기
      const tempArray = response.map((v) => {
        return Number(v);
      });
      setTokenIds(tempArray);
    } catch (error) {
      console.error(error);
    }
  };

  // 판매상태 가져오는 함수
  const getSaleStatus = async () => {
    try {
      const response: boolean = await mintNftContract.methods
        .isApprovedForAll(account, SALE_NFT_ADDRESS)
        .call();

      setSaleStatus(response);
    } catch (error) {
      console.error(error);
    }
  };

  // 판매상태 변경 함수 mint 컨트랙트의 setApprovalForAll 함수 이용
  const onClickSaleStatus = async () => {
    try {
      const response = await mintNftContract.methods
        .setApprovalForAll(SALE_NFT_ADDRESS, !saleStatus)
        .send({ from: account });

      // 정상일 경우 1 확인해서 state 변경(화면에 바로 적용)
      if (Number(response.status) === 1) {
        setSaleStatus(!saleStatus);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 지갑 로그인 안 한 상태에서 오류 발생함. 로그인 안했으면 메인 페이지로 이동하게끔(리다이렉트)
  useEffect(() => {
    if (!account) {
      redirect("/");
    }

    getSaleStatus();
    getMyNfts();
  }, [account]);

  return (
    <div>
      <div className="mb-20">
        판매상태 : {saleStatus ? "승인" : "거부"}
        <button
          onClick={onClickSaleStatus}
          className="border-2 border-black p-1"
        >
          판매상태변경
        </button>
      </div>

      {/* tokenIds 배열을 돌면서 NftCard 최신순으로(reverse)출력. key 설정 필요(index). props로 tokenId 보냄. */}
      {tokenIds?.reverse().map((v, i) => {
        return <NftCard key={i} tokenId={v} />;
      })}
    </div>
  );
};

export default MyNft;
