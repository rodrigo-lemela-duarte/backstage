import { createApiRef } from '@backstage/core-plugin-api';

export const bitcoinApiRef = createApiRef<BitcoinApi>({
  id: 'plugin.bitcoin.client',
});

export interface Bitcoin {
  code: string;
  symbol: string;
  rate: number;
  description: string;
  rate_float: number;
}

export interface BitcoinApi {
    getValueByCurrency(currency: string): Promise<Bitcoin>;
}
