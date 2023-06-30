"use client";
import { useContext, useState } from "react";
import { INft, mintNftContract, PINATA_URL } from "../lib/web3.config";
import { NextPage } from "next";
import { AppContext } from "../layout";
import axios from "axios";

const Mint: NextPage = () => {
  const { account } = useContext(AppContext);
  const [myNewNft, setMyNewNft] = useState<INft>();

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
        // 피나타로부터 메타데이터 가져오기
        const metadataResponse = await axios.get(
          `${PINATA_URL}/${Number(myNftResponse)}.json`
        );

        // console.log(metadataResponse);

        setMyNewNft({
          name: metadataResponse.data.name,
          description: metadataResponse.data.description,
          image: metadataResponse.data.image,
          attributes: metadataResponse.data.attributes,
        });
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
    </div>
  );
};

export default Mint;
