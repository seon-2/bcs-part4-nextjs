import { FC, ReactNode } from "react";

interface SideMenuProps {
  children: ReactNode;
}

const SideMenu: FC<SideMenuProps> = ({ children }) => {
  return (
    <div className="bg-red-100">
      <div>SideMenu</div>
      <div>{children}</div>
    </div>
  );
};

export default SideMenu;
