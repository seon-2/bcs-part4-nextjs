import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="bg-blue-300 min-h-screen flex justify-center items-center flex-col p-24">
      <Image
        src="/images/rainbow.jpg"
        width={300}
        height={200}
        alt="무지개 배경"
      />
      <div>{process.env.NEXT_JS}</div>

      <Link href={"/mint"}>
        <button>민팅페이지</button>
      </Link>
    </div>
  );
};

export default Home;
