import { FC, ReactNode } from "react";

interface SideMenuProps {
  children: ReactNode;
}

const SideMenu: FC<SideMenuProps> = ({ children }) => {
  return (
    <div className="bg-red-100 min-h-screen flex">
      {/* shrink-0 옵션 줘야 w-full로 인해 줄어드는 것 막을 수 있음 */}
      <nav className="bg-yellow-100 w-60 shrink-0">SideMenu</nav>
      <div className="flex flex-col w-full">{children}</div>
    </div>
  );
};

export default SideMenu;
