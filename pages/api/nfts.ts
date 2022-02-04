import type { NextApiRequest, NextApiResponse } from 'next';
import { Currency } from 'types/Currency';
import { NftItem } from 'types/NftItem';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomPrice(): number {
  return Math.random() * 100;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<NftItem[]>) {
  const collection = req.query.collection;

  if (!collection) {
    return res.status(404).json([]);
  }

  const itemsCount = getRandomInt(10, 20);

  const items: NftItem[] = [...Array(itemsCount)].map((_, i) => ({
    id: `nft_${i}`,
    imageUrl: `/nft${1 + (i % 3)}.png`,
    name: `${collection} #${1 + i}`,
    price: getRandomPrice().toString(),
    currency: Currency.Eth,
  }));

  return res.status(200).json(items);
}
