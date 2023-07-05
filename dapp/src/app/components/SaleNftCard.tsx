import { FC } from "react";
import NftCard from "./NftCard";

interface SaleNftCardProps {
  tokenId: number;
}

const SaleNftCard: FC<SaleNftCardProps> = ({ tokenId }) => {
  return <NftCard tokenId={tokenId} />;
};

export default SaleNftCard;
