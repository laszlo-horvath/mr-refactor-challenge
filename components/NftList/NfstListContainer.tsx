import { useState, FormEvent, ChangeEvent } from 'react';
import { NftItem } from 'types/NftItem';
import NftList from './NftList';

const NftListContainer = () => {
  const [collection, setCollection] = useState('');
  const [cheapestNfts, setCheapestNfts] = useState(new Array());
  const [isLoading, setLoading] = useState(false);
  const [errors, setFormErrors] = useState({ collection: false });

  const fetchNfts = () => {
    fetch(`/api/nfts?collection=${collection}`)
      .then(response => response.json())
      .then((allNfts: NftItem[]) => {
        const cheapestNftList = getCheapestNfts(allNfts);
        setCheapestNfts(cheapestNftList);
        setLoading(false);
      })
      .catch(e => console.log(e));
  };

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    setFormErrors({ collection: !collection });
    if (!collection) {
      setCheapestNfts(new Array());
      return;
    }

    setLoading(true);

    // Fake loading to see the loading spinner
    setTimeout(() => fetchNfts(), 500);
  };

  const onCollectionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCollection(event.target.value);
    setFormErrors({ collection: !collection });
  };

  const getCheapestNfts = (nftsArray: NftItem[], maxCount = 4) => {
    nftsArray.sort((a: NftItem, b: NftItem) => parseFloat(a.price) - parseFloat(b.price));

    return nftsArray.slice(0, maxCount);
  };

  return (
    <NftList
      isLoading={isLoading}
      errors={errors}
      nfts={cheapestNfts}
      collection={collection}
      onCollectionChange={onCollectionChange}
      onFormSubmit={onFormSubmit}
    />
  );
};

export default NftListContainer;
