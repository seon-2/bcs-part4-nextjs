import { User } from "@prisma/client";
import { FC } from "react";

export interface ContractCardProps {
  address: string;
  user: User;
}

const ContractCard: FC<ContractCardProps> = () => {
  return <li>ContractCard</li>;
};

export default ContractCard;
