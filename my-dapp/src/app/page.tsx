"use client";

import { NextPage } from "next";
import { FormEventHandler, useEffect, useState } from "react";

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>("");

  // 이메일 입력 받아서 메타메스크로 로그인
  const onSubmitMetamask: FormEventHandler = (e) => {
    e.preventDefault();
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
