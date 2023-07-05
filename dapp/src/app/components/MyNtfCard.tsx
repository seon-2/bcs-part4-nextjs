import { FC, useEffect, useState } from "react";
import NftCard from "./NftCard";
import { saleNftContract } from "../lib/web3.config";

interface MyNftCardProps {
  tokenId: number;
}

const MyNftCard: FC<MyNftCardProps> = ({ tokenId }) => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [saleToggle, setSaleToggle] = useState<boolean>(false);

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

  // 판매등록 토글 버튼
  const onClickSaleToggle = () => {
    setSaleToggle(!saleToggle);
  };

  useEffect(() => {
    getCurrentPrice();
  }, []);

  return (
    <div>
      {currentPrice === 0 ? (
        <>
          <button onClick={onClickSaleToggle}>판매등록</button>
          {saleToggle && (
            <form>
              <input type="text" />
              <input type="submit" value="승인" />
            </form>
          )}
        </>
      ) : (
        <div>현재 가격 : {currentPrice}Matic</div>
      )}
      <NftCard tokenId={tokenId} />
    </div>
  );
};

export default MyNftCard;
