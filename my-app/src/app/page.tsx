import { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div className="bg-blue-300 min-h-screen flex justify-center items-center">
      <Image
        src="/images/rainbow.jpg"
        width={300}
        height={200}
        alt="무지개 배경"
      />
    </div>
  );
};

export default Home;
