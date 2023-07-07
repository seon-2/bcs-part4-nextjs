// express 역할
import { NextResponse } from "next/server";

// 함수명이 해당하는 요청으로 정해져있음. (POST), DB와 상호작용하니 비동기로 해야 함
// 응답 할 때 까지 기다려서 응답이 꼭 있어야 함.
export const POST = async () => {
  try {
    // npm run dev 했던 터미널에서 확인 가능
    console.log("Work!!!");

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(error);
  }
};
