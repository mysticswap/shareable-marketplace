/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectedTrait } from "../context/HomeContext/types";
import { Market, TokenToken } from "../types/rsv-types/collection-nfts.types";

export const getQueryString = (params: { [x: string]: any }) => {
  return Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
};

export const truncateAddress = (
  address: string,
  amount: number,
  ellipsis: string
) => {
  return `${address?.slice(0, amount)}${ellipsis}${address?.slice(-amount)}`;
};

export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

export const convertDecimalsToReadableNumbers = (
  amount: string,
  decimal: number
) => {
  const result = Number(amount) / Math.pow(10, decimal);
  return result || 0;
};

export const convertTokenAmountToDecimal = (amount: number) => {
  return amount * Math.pow(10, 18);
  // might need to change 18 to dynamic figure
};
export const convertTokenAmountToDecimals = (
  amount: number,
  decimal: number
) => {
  return amount * Math.pow(10, decimal);
  // might need to change 18 to dynamic figure
};

export const metamaskPresent = () => {
  const ethereum = window.ethereum;
  return typeof ethereum !== "undefined" && window.ethereum.isMetaMask;
};

export const extractMetadata = (nft: TokenToken, nftMarketInfo: Market) => {
  return {
    collectionName: nft?.collection?.name,
    nftName: nft?.name,
    nftImage: nft?.image,
    amount: nftMarketInfo?.floorAsk?.price?.amount?.decimal,
    price: nftMarketInfo?.floorAsk?.price?.amount?.usd,
    floorPrice: nftMarketInfo?.floorAsk?.price?.amount?.decimal,
  };
};

export const formatOnlyDecimals = (x: number) => {
  return (x * 1.5).toFixed(2).replace(/[.,]00$/, "");
};

export const redirectToMSWalletPage = (address: string) => {
  address && window.open(`https://mysticswap.io/wallet-view/${address}`);
};

export const generateAttributeString = (selectedTraits: SelectedTrait[]) => {
  let string = "";
  selectedTraits.forEach((item) => {
    string += `&attributes[${item.type}]=${item.value}`;
  });
  return string;
};

export const getHostName = () => {
  const hostName = window.location.hostname;
  switch (hostName) {
    case "localhost":
      return "marketplace.mysticswap.io";
    default:
      return hostName;
  }
};

export const getPreviousCollectionAddress = () => {
  const previousCollectionAddress = localStorage.getItem("current-collection");
  if (previousCollectionAddress) {
    return JSON?.parse(previousCollectionAddress);
  }
};

export const copyToClipboard = (text: string) => {
  window.navigator.clipboard.writeText(text);
};

export const addOpacity = (color: string, opacity: number) => {
  // coerce values so it is between 0 and 1.
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
};

export const getOnePercentFee = (tokenValueDecimals: number) => {
  return Number(
    convertTokenAmountToDecimal(tokenValueDecimals * 0.01).toFixed(0)
  );
};
export const getOnePercentFeeToken = (
  tokenValueDecimals: number,
  decimals: number
) => {
  return Number(
    convertTokenAmountToDecimals(tokenValueDecimals * 0.01, decimals).toFixed(0)
  );
};
