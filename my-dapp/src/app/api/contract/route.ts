import { prisma } from "@/app/lib/server";
import { NextRequest, NextResponse } from "next/server";

// 컨트랙트 데이터 조회
export const GET = async (req: NextRequest) => {
  try {
    // query string 방식 (http://localhost:3000/user?account=5) cf. params 방식 (http://localhost:3000/user/5)
    const { searchParams } = new URL(req.url);

    const signedToken = searchParams.get("signed-token");

    // signedToken 없을 때 에러 처리
    if (!signedToken) {
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

    const user = await prisma.user.findFirst({
      where: {
        signedToken,
      },
    });

    // user 없을 때 에러 처리
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

    const contracts = await prisma.contract.findMany({
      where: {
        userId: user.id,
      },
      select: {
        address: true,
        user: true,
      },
    });

    // 컨트랙트 확인
    console.log(contracts);

    return NextResponse.json({
      ok: true,
      contracts,
    });
  } catch (error) {
    console.error(error);
  }
};

// 컨트랙트 데이터 db에 post
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { address, signedToken } = body;

    // signedToken 없는 경우 에러 처리 -> findFirst에서 undefined 걸러내지 못함
    if (!signedToken) {
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

    // findFirst : unique 키워드는 없어서 여러 개가 조회될 수 있지만, 그 중 첫번째 값
    const user = await prisma.user.findFirst({
      where: {
        signedToken,
      },
    });

    // user 없는 경우 에러 처리
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

    // user 있음
    const contract = await prisma.contract.create({
      data: {
        address,
        userId: user.id,
      },
    });

    return NextResponse.json({
      ok: true,
      contract,
    });
  } catch (error) {
    console.error(error);
  }
};
