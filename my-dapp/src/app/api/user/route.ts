// express 역할
import { prisma } from "@/app/lib/server";
import { NextResponse } from "next/server";

// 함수명이 해당하는 요청으로 정해져있음. (POST), DB와 상호작용하니 비동기로 해야 함
// 응답 할 때 까지 기다려서 응답이 꼭 있어야 함.
export const POST = async (req: Request) => {
  try {
    // json에 body가 담겨있음
    const { account, email, signedToken } = await req.json();

    // 지갑주소, 이메일 DB에 저장
    // upsert = update + create (처음 들어오면 만들고 있으면 업데이트)
    const user = await prisma.user.upsert({
      where: { account },
      update: {
        signedToken,
      },
      create: {
        account,
        email,
        signedToken,
      },
      select: {
        account: true,
        email: true,
        nickname: true,
        signedToken: true,
      },
    });

    // console.log()는 npm run dev 했던 터미널에서 확인 가능

    return NextResponse.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.error(error);
  }
};
