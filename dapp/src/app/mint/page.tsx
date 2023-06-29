"use client";

import { mintNftContract } from "../lib/web3.config";
import { NextPage } from "next";

const Mint: NextPage = () => {
  const onClickContract = async () => {
    try {
      const response = await mintNftContract.methods.name().call();

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      Mint<button onClick={onClickContract}>컨트랙트 조회</button>
    </div>
  );
};

export default Mint;
