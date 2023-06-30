// 민팅 후 nft 보여주는 것과 나의 nft 보여주는 UI가 같으니 하나의 컴포넌트로 만들기
import { FC, useState, useEffect } from "react";
import { INft, PINATA_URL } from "../lib/web3.config";
import Image from "next/image";
import axios from "axios";

// 2. props 받아오기 위한 interface 작성
interface NftCardProps {
  tokenId: number;
}

const NftCard: FC<NftCardProps> = ({ tokenId }) => {
  const [nft, setNft] = useState<INft>();

  // 1. mint 페이지에 있던 metadataResponse 가져와서 async 함수 안에 넣기 (변수 조심!)
  const getNftMetadata = async () => {
    try {
      // 3. tokenId를 MyNft에서 props로 받아오기
      const response = await axios.get(`${PINATA_URL}/${Number(tokenId)}.json`);

      setNft({
        name: response.data.name,
        description: response.data.description,
        image: response.data.image,
        attributes: response.data.attributes,
      });
    } catch (error) {}
  };

  // 4. getNftMetadata() 실행
  useEffect(() => {
    getNftMetadata();
  }, []);

  // mint 페이지에서 이미지, 정보 포함한 div 가져오기
  // nft가 없는 경우 처리
  return (
    <div>
      {nft ? (
        <div>
          <Image
            src={nft.image}
            width={200}
            height={200}
            alt="NFT"
            loading="lazy"
          />
          <div>이름 : {nft.name}</div>
          <div>설명 : {nft.description}</div>
          {nft.attributes.map((v, i) => {
            return (
              <div key={i}>
                {v.trait_type} : {v.value}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mb-40">로딩중 ...</div>
      )}
    </div>
  );
};

export default NftCard;
