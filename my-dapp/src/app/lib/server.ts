// 서버측에서 실행되는 설정

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();