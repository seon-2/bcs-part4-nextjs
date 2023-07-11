// express 역할
import { prisma } from "@/app/lib/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const signedToken = searchParams.get("signed-token");

    const user = await prisma.user.findFirst({
      where: {
        signedToken,
      },
    });

    console.log(user);

    // user가 없는 경우 에러 처리
    // 화면에서 로그인 하고 개발자 도구에서 수동으로 signedToken 변경하고 컨트랙트 배포 시도
    // 콘솔 에러 400번 발생. response에서 'Not exist token.' 확인
    if (!user) {
      return NextResponse.json(
        {
          ok: false,
          error: "Not exist token.",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(error);
  }
};

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
