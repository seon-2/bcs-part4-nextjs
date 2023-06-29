"use client";

import { useState } from "react";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import "./globals.css";
import { Inter } from "next/font/google";
import { createContext } from "react";

const inter = Inter({ subsets: ["latin"] });

// 2. createContext 만들기
export const AppContext = createContext<any>(null);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. 전역으로 사용할 변수 선언
  const [account, setAccount] = useState<string>("");

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* 3. 전체를 감싸기 */}
        <AppContext.Provider value={{ account, setAccount }}>
          <SideMenu>
            <Header />
            {children}
          </SideMenu>
        </AppContext.Provider>
      </body>
    </html>
  );
}
