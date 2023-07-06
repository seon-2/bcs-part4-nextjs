import { FC, useContext, useEffect, useState } from "react";
import NftCard from "./NftCard";
import { mintNftContract, saleNftContract, web3 } from "../lib/web3.config";
import { AppContext } from "../layout";

interface SaleNftCardProps {
  tokenId: number;
  getSaleNfts: () => Promise<void>;
}

const SaleNftCard: FC<SaleNftCardProps> = ({ tokenId, getSaleNfts }) => {
  const [salePrice, setSalePrice] = useState<number>(0);
  const [isMyNft, setIsMyNft] = useState<boolean>(false);
  const { account } = useContext(AppContext);

  // nft 가격 가져오기
  const getSalePrice = async () => {
    try {
      const response = await saleNftContract.methods
        .getNftPrice(tokenId)
        .call();

      setSalePrice(Number(web3.utils.fromWei(Number(response), "ether")));
    } catch (error) {
      console.error(error);
    }
  };

  // 내가 가진 nft인지 판별하는 함수. 내꺼 빼고 구매하기 버튼 붙이기
  const getIsMyNft = async () => {
    try {
      const response: string = await mintNftContract.methods
        .ownerOf(tokenId)
        .call();

      // 메타마스크로 가져온 주소와 web3로 가져온 주소가 대소문자가 달라서 맞춰줘야 함
      // console.log("Sale Address : ", response, " My Address : ", account);
      // console.log(response.toLowerCase() === account);
      setIsMyNft(response.toLowerCase() === account);
    } catch (error) {
      console.error(error);
    }
  };

  // 구매 기능
  const onClickPurchase = async () => {
    try {
      const response = await saleNftContract.methods
        .purchaseNft(tokenId)
        .send({ from: account, value: web3.utils.toWei(salePrice, "ether") });

      console.log(response);

      // 정상적으로 구매되었으면 판매중인 nft 리스트 불러오기
      if (Number(response.status) === 1) {
        getSaleNfts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSalePrice();
  }, []);

  // account 변경될 때 getIsMyNft() 실행
  useEffect(() => {
    getIsMyNft();
  }, [account]);

  return (
    <div>
      <div>{salePrice}Matic</div>
      {isMyNft ? (
        // 내 nft에 붙일 부분
        <div>(My NFT)</div>
      ) : (
        // 지갑 로그인 되어있을 때만 구매 가능하도록
        account && (
          // 다른 사람들의 nft에 붙일 부분
          <div>
            <button onClick={onClickPurchase}>구매하기</button>
          </div>
        )
      )}
      <NftCard tokenId={tokenId} />
    </div>
  );
};

export default SaleNftCard;
