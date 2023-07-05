import { FC, useEffect } from "react";
import NftCard from "./NftCard";
import { saleNftContract } from "../lib/web3.config";

interface MyNftCardProps {
  tokenId: number;
}

const MyNftCard: FC<MyNftCardProps> = ({ tokenId }) => {
    // nft 가격 받아오기
  const getCurrentPrice = async () => {
    try {
      const response = await saleNftContract.methods
        .getNftPrice(tokenId)
        .call();

      console.log(response); // 콘솔에서 0n으로 확인
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentPrice();
  }, []);

  return <NftCard tokenId={tokenId} />;
};

export default MyNftCard;
