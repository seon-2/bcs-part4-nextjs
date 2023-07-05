import { FC, FormEventHandler, useEffect, useState } from "react";
import NftCard from "./NftCard";
import { saleNftContract } from "../lib/web3.config";

interface MyNftCardProps {
  tokenId: number;
}

const MyNftCard: FC<MyNftCardProps> = ({ tokenId }) => {
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [saleToggle, setSaleToggle] = useState<boolean>(false);
  const [salePrice, setSalePrice] = useState<string>("");

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

  // 판매가격 설정
  const onSubmitSalePrice: FormEventHandler = async (e) => {
    try {
      e.preventDefault();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentPrice();
  }, []);

  useEffect(() => console.log(salePrice), [salePrice]);

  return (
    <div>
      {currentPrice === 0 ? (
        <>
          <button onClick={onClickSaleToggle}>판매등록</button>
          {saleToggle && (
            <form onSubmit={onSubmitSalePrice}>
              <input
                type="text"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
              />
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
