"use client";

import axios from "axios";
import { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";
import { personal } from "./lib/client";

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>("");

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
        // 서명 요청
        // 첫번째 값 data 중요! 한 글자라도 틀리면 다른 값이 나옴
        const signedToken = await personal.sign("Hello", accounts[0], "Pass");
        // console.log(signedToken);

        // 서명된 값 기준으로 지갑주소 꺼내오기 (복호화)
        const recoverAccount = await personal.ecRecover("Hello", signedToken);
        console.log(recoverAccount);

        // axios로 POST 요청 보내기
        const response = await axios.post("http://localhost:3000/api/user", {
          account: accounts[0],
          email, // 키, 벨류가 이름이 같아 합쳐서
          signedToken,
        });
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // form 입력 확인
  useEffect(() => {
    console.log(email);
  }, [email]);

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
      </div>
    </div>
  );
};

export default Home;
