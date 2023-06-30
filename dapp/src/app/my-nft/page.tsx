"use client";

import { mintNftContract } from "../lib/web3.config";
import { NextPage } from "next";
import { useContext, useEffect } from "react";
import { AppContext } from "../layout";

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

  useEffect(() => {
    getMyNfts();
  }, []);

  return <div>MyNft</div>;
};

export default MyNft;
