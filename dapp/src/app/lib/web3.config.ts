import { MetaMaskSDK } from "@metamask/sdk";
import Web3 from "web3";
import MINT_NFT_ABI from "../lib/mintNftAbi.json";
import SALE_NFT_ABI from "../lib/saleNftAbi.json";

const MMSDK = new MetaMaskSDK();
export const ethereum = MMSDK.getProvider();

export const MUMBAI_CHAIN_ID = 80001;

export const web3 = new Web3(ethereum);

const MINT_NFT_ADDRESS = "0xE07675529794B77B193a42eb1375b6d8b4fAeA87";
const SALE_NFT_ADDRESS = "0x8aED796D37363A5bE66446E1e1c0b8904f8e473B";

export const mintNftContract = new web3.eth.Contract(
  MINT_NFT_ABI,
  MINT_NFT_ADDRESS
);
export const saleNftContract = new web3.eth.Contract(
  SALE_NFT_ABI,
  SALE_NFT_ADDRESS
);
