"use client";

import SaleNftCard from "../components/SaleNftCard";
import { saleNftContract } from "../lib/web3.config";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const SaleNft: NextPage = () => {
  const [saleNfts, setSaleNfts] = useState<number[]>();

  // 판매중인 nft 가져오기
  const getSaleNfts = async () => {
    try {
      const response: bigint[] = await saleNftContract.methods
        .getOnSaleNft()
        .call();

      const tempArray = response.map((v) => Number(v));

      setSaleNfts(tempArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSaleNfts();
  }, []);

  return (
    <div>
      {saleNfts?.map((v, i) => (
        // Sale 페이지에서 구매하기 누르면 판매중인 nft 다시 실행시키기 위해 getSaleNfts() 보내기
        <SaleNftCard key={i} tokenId={v} getSaleNfts={getSaleNfts} />
      ))}
    </div>
  );
};

export default SaleNft;
