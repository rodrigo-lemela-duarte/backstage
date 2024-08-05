import { createApiRef } from '@backstage/core-plugin-api';

export type Bitcoin = {
  code: string;
  symbol: string;
  rate: number;
  description: string;
  rate_floate: number;
};

export const bitcoinAPIRef = createApiRef<BitcoinAPI>({
  id: 'plugin.bitcoin.service',
});

export interface BitcoinAPI {
  getByCurrency(currency: string): Promise<Bitcoin>;
}
