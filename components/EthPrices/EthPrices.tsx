import { Fragment, useState } from 'react';
import Image from 'next/image';
import isEqual from 'lodash.isequal';
import useInterval from '@use-it/interval';

//@ts-ignore
import { getEthPriceNow } from 'get-eth-price';

import Counter from './Counter';
import { EthPrice } from 'types/EthPrice';

const POLLING_INTERVAL = 1000 * 5;

export default function EthPrices() {
  const [prevEthPrice, setPrevEthPrice] = useState<EthPrice>({ USD: 0, BTC: 0, EUR: 0, GBP: 0 });
  const [currentEthPrice, setCurrentEthPrice] = useState<EthPrice>({ USD: 0, BTC: 0, EUR: 0, GBP: 0 });

  const getPrice = async () => {
    const ethPriceNow = await getEthPriceNow();
    const ethValues: any = Object.values(ethPriceNow);
    const ethPrices: EthPrice = ethValues && ethValues[0]?.ETH;
    const { USD, BTC, EUR, GBP } = ethPrices;

    if (!isEqual(prevEthPrice, currentEthPrice)) {
      setPrevEthPrice({ USD, BTC, EUR, GBP });
    }

    setCurrentEthPrice({ USD, BTC, EUR, GBP });
  };

  useInterval(() => {
    getPrice();
  }, POLLING_INTERVAL);

  return (
    <div className="flex sm:justify-center justify-end text-white text-sm">
      <div className="relative top-0.5 mr-2"><Image src="/eth.png" alt="ETH Logo" width={18} height={18} /></div>

      <Counter from={prevEthPrice.BTC} to={currentEthPrice.BTC} currency={'BTC'} fixed={4} />
      <Counter from={prevEthPrice.USD} to={currentEthPrice.USD} currency={'USD'} />
      <Counter from={prevEthPrice.EUR} to={currentEthPrice.EUR} currency={'EUR'} hiddenMobile={true} />
      <Counter from={prevEthPrice.GBP} to={currentEthPrice.GBP} currency={'GBP'} hiddenMobile={true} />
    </div>
  );
}
