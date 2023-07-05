import { FC, useEffect, useState } from "react";
import NftCard from "./NftCard";
import { saleNftContract } from "../lib/web3.config";

interface MyNftCardProps {
  tokenId: number;
}

const MyNftCard: FC<MyNftCardProps> = ({ tokenId }) => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);

  // nft 가격 받아오기
  const getCurrentPrice = async () => {
    try {
      const response = await saleNftContract.methods
        .getNftPrice(tokenId)
        .call();

      setCurrentPrice(Number(response));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentPrice();
  }, []);

  return (
    <div>
      <div>현재 가격 : {currentPrice}Matic</div>
      <NftCard tokenId={tokenId} />
    </div>
  );
};

export default MyNftCard;
