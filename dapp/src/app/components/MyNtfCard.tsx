import { FC } from "react";
import NftCard from "./NftCard";

interface MyNftCardProps {
  tokenId: number;
}

const MyNftCard: FC<MyNftCardProps> = ({ tokenId }) => {
  return <NftCard tokenId={tokenId} />;
};

export default MyNftCard;
