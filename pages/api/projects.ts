import type { NextApiRequest, NextApiResponse } from 'next';

type Data = any;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log('API start');

  res.status(200).json([
    { logo: '/project1.png', name: 'Bored Ape Yacht Club', floorPrice: 104.28 },
    { logo: '/project2.png', name: 'The Sandbox', floorPrice: 2.0 },
    { logo: '/project1.png', name: 'Doodles', floorPrice: 8.2 },
    { logo: '/project2.png', name: 'Cool Cats NFT', floorPrice: 7.32 },
    { logo: '/project1.png', name: 'Azuki', floorPrice: 9.23 },
    { logo: '/project2.png', name: 'World of Women', floorPrice: 7.11 },
    { logo: '/project1.png', name: 'Chromie Squiggle by Snowfro', floorPrice: 2 },
  ]);

  console.log('END API response');
}
