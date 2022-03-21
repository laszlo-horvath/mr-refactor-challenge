import { FormEvent, ChangeEvent } from 'react';

import { NftItem } from 'types/NftItem';
import Loading from './../Loading/Loading';
import Nft from './Nft';
import { FormError } from './../Form/FormError';

interface NftListProps {
  isLoading: boolean;
  errors: { collection: boolean };
  collection: string;
  nfts: NftItem[];
  onFormSubmit: (event: FormEvent) => void;
  onCollectionChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const NftList = (props: NftListProps) => {
  const { isLoading, errors, nfts, collection, onCollectionChange, onFormSubmit } = props;

  return (
    <div
      data-automation-id="home"
      className="max-w-screen-lg mt-10 mb-20 mx-auto p-6 bg-slate-800 rounded-xl shadow-lg ring-1 ring-white/10 ring-inset text-center"
    >
      <section>
        <h2 className="mb-2 text-2xl font-semibold tracking-tight text-white">
          My NFT List UI component
        </h2>
        <p className="mt-2 mb-4 text-lg text-slate-400">
          List the top 4 cheapest NFT from a collection you like!
        </p>
      </section>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="collection" className="hidden mb-2 text-slate-200">
          Collection name
        </label>
        <input
          type="text"
          id="collection"
          name="collection"
          placeholder="Enter a collection name..."
          className="border border-gray-200 shadow-md px-3 py-2 rounded h-12 w-80"
          value={collection}
          onChange={onCollectionChange}
        />
        {errors.collection && <FormError />}
        <button
          type="submit"
          className="mt-2 mb-6 mx-auto block w-80 border border-indigo-500 bg-indigo-500 px-6 py-3 rounded font-medium text-white"
        >
          Find NFTs
        </button>
      </form>

      {isLoading && <Loading />}

      {!isLoading && (
        <div className="flex flex-col md:flex-row">
          {nfts.map((nft, index) => (
            <Nft key={nft.id} nft={nft} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NftList;
