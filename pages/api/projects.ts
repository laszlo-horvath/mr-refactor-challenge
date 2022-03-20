import type { NextApiRequest, NextApiResponse } from 'next';
import Project from 'types/Project';

export default function handler(req: NextApiRequest, res: NextApiResponse<Project[]>) {
  console.log('API start');

  res.status(200).json([
    { logo: '/nft1.png', name: 'Bored Ape Yacht Club', floorPrice: 104.28 },
    { logo: '/nft2.png', name: 'The Sandbox', floorPrice: 2.0 },
    { logo: '/doodles.png', name: 'Doodles', floorPrice: 8.2 },
    { logo: '/nft3.png', name: 'Cool Cats NFT', floorPrice: 7.32 },
    { logo: '/azuki.jpeg', name: 'Azuki', floorPrice: 9.23 },
    { logo: '/wow.jpeg', name: 'World of Women', floorPrice: 7.11 },
    { logo: '/chromie.png', name: 'Chromie Squiggle by Snowfro', floorPrice: 2 },
  ]);

  console.log('END API response');
}
