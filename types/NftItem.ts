import { Currency } from './Currency';

export interface NftItem {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  currency: Currency;
}
