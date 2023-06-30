import Link from "next/link";
import { FC, ReactNode } from "react";

interface SideMenuProps {
  children: ReactNode;
}

const SideMenu: FC<SideMenuProps> = ({ children }) => {
  return (
    <div className="bg-red-100 min-h-screen flex">
      {/* shrink-0 옵션 줘야 w-full로 인해 줄어드는 것 막을 수 있음 */}
      <nav className="bg-yellow-100 w-60 shrink-0 flex flex-col py-8 pl-4">
        <div>프로젝트 다덴부</div>
        <div className="bg-orange-100 grow pt-12 flex flex-col">
          <Link href="/">
            <button>Main페이지</button>
          </Link>
          <Link href="/mint">
            <button>Mint페이지</button>
          </Link>
          <Link href="/my-nft">
            <button>My NFT</button>
          </Link>
        </div>
        <div>Created by jiseon</div>
      </nav>
      <div className="flex flex-col w-full">{children}</div>
    </div>
  );
};

export default SideMenu;
