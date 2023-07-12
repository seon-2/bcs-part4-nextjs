import { prisma } from "@/app/lib/server";
import { NextRequest, NextResponse } from "next/server";

// 컨트랙트 데이터 db에 post
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const { address } = body;

    const contract = await prisma.contract.create({
      data: {
        address,
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