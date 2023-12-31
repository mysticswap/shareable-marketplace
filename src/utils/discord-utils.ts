import { getHostName, truncateAddress } from ".";
import { DiscordPostBody } from "../types/discord-post.types";
import { TokenElement } from "../types/rsv-types/collection-nfts.types";

export const getDiscordEndpointData = (
  nft: TokenElement,
  buyer: string,
  favicon: string,
  offeredEth?: string,
  offeredUsd?: string
) => {
  const data: DiscordPostBody = {
    hostname: getHostName(),
    seller: truncateAddress(nft?.token?.owner, 5, "..."),
    buyer: truncateAddress(buyer, 5, "..."),
    imageUrl: nft?.token?.image,
    priceEth:
      offeredEth || nft?.market?.floorAsk?.price?.amount?.native.toString(),
    priceUsd:
      offeredUsd || nft?.market?.floorAsk?.price?.amount?.usd.toString(),
    title: `${nft?.token?.name} SOLD!`,
    favicon,
  };
  return data;
};
