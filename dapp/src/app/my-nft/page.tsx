"use client";

import { mintNftContract } from "../lib/web3.config";
import { NextPage } from "next";
import { useContext, useEffect } from "react";
import { AppContext } from "../layout";
import { redirect } from "next/navigation"; // 수동으로 입력 필요 (자동완성 X)

const MyNft: NextPage = () => {
  // 내가 가진 nft 보여주는 기능
  // solidity의 getAllNft 함수 사용 (주소값 넣고 uint[] 반환함)
  const { account } = useContext(AppContext);

  const getMyNfts = async () => {
    try {
      const response = await mintNftContract.methods.getAllNft(account).call();

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // 지갑 로그인 안 한 상태에서 오류 발생함. 로그인 안했으면 메인 페이지로 이동하게끔(리다이렉트)
  useEffect(() => {
    if (!account) {
      redirect("/");
    }

    getMyNfts();
  }, [account]);

  return <div>MyNft</div>;
};

export default MyNft;
