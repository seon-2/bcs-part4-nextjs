"use client";
import { useContext } from "react";
import { mintNftContract, PINATA_URL } from "../lib/web3.config";
import { NextPage } from "next";
import { AppContext } from "../layout";
import axios from "axios";

const Mint: NextPage = () => {
  const { account } = useContext(AppContext);

  const onClickMint = async () => {
    try {
      const mintResponse = await mintNftContract.methods
        .mintNft()
        .send({ from: account });

      // console.log(typeof response.status);

      if (Number(mintResponse.status) === 1) {
        const myNftResponse = await mintNftContract.methods
          .getLatestNft(account)
          .call();

        const metadataResponse = await axios.get(
          `${PINATA_URL}/${Number(myNftResponse)}.json`
        );

        console.log(metadataResponse);

        // console.log(myNftResponse);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onClickBalanceOf = async () => {
    try {
      const response = await mintNftContract.methods.balanceOf(account).call();

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>{account && <button onClick={onClickMint}>민팅하기</button>}</div>
      <div>
        {account && (
          <button onClick={onClickBalanceOf}>nft 개수 확인하기</button>
        )}
      </div>
    </div>
  );
};

export default Mint;
