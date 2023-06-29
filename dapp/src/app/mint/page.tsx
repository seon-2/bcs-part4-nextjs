"use client";
import { useContext } from "react";
import { mintNftContract } from "../lib/web3.config";
import { NextPage } from "next";
import { AppContext } from "../layout";

const Mint: NextPage = () => {
  const { account } = useContext(AppContext);

  const onClickMint = async () => {
    try {
      const response = await mintNftContract.methods
        .mintNft()
        .send({ from: account });

      console.log(typeof response.status);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>{account && <button onClick={onClickMint}>민팅하기</button>}</div>
  );
};

export default Mint;
