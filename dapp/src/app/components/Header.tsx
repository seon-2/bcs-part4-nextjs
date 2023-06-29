"use client";
// 클라이언트쪽에서 실행되어야 할 때 상단에 적어줌
// (nextjs는 서버프레임워크이기 때문에 서버에서 실행되어야 할 파일과 클라이언트에서 실행되어야 하는 파일을 구분해줘야 함)

import { FC, useState } from "react";
import { MetaMaskSDK } from "@metamask/sdk";

const Header: FC = () => {
  const [account, setAccount] = useState<string>("");

  const MMSDK = new MetaMaskSDK();
  const ethereum = MMSDK.getProvider();

  const onClickLogIn = async () => {
    try {
      const accounts = await ethereum?.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      //   console.log(accounts);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-green-100 py-4 pr-8 flex justify-end">
      {account ? (
        <div>
          {account.substring(0, 4)}...{account.substring(account.length - 4)}
        </div>
      ) : (
        <button onClick={onClickLogIn}>지갑로그인</button>
      )}
    </div>
  );
};

export default Header;
