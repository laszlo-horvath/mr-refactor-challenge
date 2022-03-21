import Image from 'next/image';
import { NftItem } from 'types/NftItem';

interface NftProps {
  nft: NftItem;
  index?: number;
}

const Nft = (props: NftProps) => {
  const { nft, index } = props;

  return (
    <div
      key={nft.id}
      className="flex-1 relative text-center md:max-w-[24%] sm:max-w-full my-2 mr-2 border-4 border-indigo-800 rounded-lg p-3 transition-all hover:drop-shadow-xl hover:scale-110 bg-indigo-700 hover:bg-indigo-600 hover:z-50"
    >
      {index !== undefined && (
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-green-600 rounded-full text-xs pt-0.5 text-white z-1">
          {index + 1}
        </span>
      )}
      <Image
        src={nft.imageUrl}
        alt={nft.name}
        width="128"
        height="128"
        className="rounded-lg w-full"
      />
      <h3 className="truncate mt-1 mb-2 text-white">{nft.name}</h3>
      <div className="text-slate-400">
        <span className="relative top-1">
          <Image
            title={nft.currency}
            src="/eth.png"
            alt="ETH Logo"
            className="mt-1"
            width={18}
            height={18}
          />
        </span>
        <span className="inline-block ml-2">{parseFloat(nft.price).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Nft;
