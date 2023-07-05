"use client";

import NftCard from "../components/NftCard";
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
        <NftCard key={i} tokenId={v} />
      ))}
    </div>
  );
};

export default SaleNft;
