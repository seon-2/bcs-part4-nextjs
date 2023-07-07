"use client";

import { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";

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

      console.log(accounts);
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
