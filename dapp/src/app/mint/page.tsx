"use client";
import { useContext, useState } from "react";
import { INft, mintNftContract, PINATA_URL } from "../lib/web3.config";
import { NextPage } from "next";
import { AppContext } from "../layout";
import NftCard from "../components/NftCard";

const Mint: NextPage = () => {
  const { account } = useContext(AppContext);
  const [tokenId, setTokenId] = useState<number>();

  const onClickMint = async () => {
    try {
      // 민팅하기
      const mintResponse = await mintNftContract.methods
        .mintNft()
        .send({ from: account });
      // 토큰 아이디 조회
      if (Number(mintResponse.status) === 1) {
        const myNftResponse = await mintNftContract.methods
          .getLatestNft(account)
          .call();

        setTokenId(Number(myNftResponse));
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
      {account && <button onClick={onClickBalanceOf}>nft 개수 확인하기</button>}
      {tokenId && <NftCard tokenId={tokenId} />}
    </div>
  );
};

export default Mint;
