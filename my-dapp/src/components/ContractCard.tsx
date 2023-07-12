import { User } from "@prisma/client";
import { FC } from "react";

export interface ContractCardProps {
  address: string;
  user: User;
}

const ContractCard: FC<ContractCardProps> = ({ address, user }) => {
  return (
    <li className="border-2 border-black my-2 p-2 rounded-md w-fit bg-white shadow-xl">
      <div>유저 이메일 : {user.email}</div>
      <div>컨트랙트 주소 : {address}</div>
      <div className="flex justify-end mt-2">
        <button className="bg-green-500 text-white rounded-md px-2 py-1">
          민팅
        </button>
      </div>
    </li>
  );
};

export default ContractCard;
