import { DiscoveryApi } from '@backstage/core-plugin-api';
import { BitcoinAPI, Bitcoin } from '../types';

export class BitcoinAPIClient implements BitcoinAPI {
  private readonly discoveryApi: DiscoveryApi;

  constructor(options: { discoveryApi: DiscoveryApi }) {
    this.discoveryApi = options.discoveryApi;
  }

  private async handeResponse(response: Response): Promise<any> {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }

  async getByCurrency(currency: string): Promise<Bitcoin> {
    const url = `${await this.discoveryApi.getBaseUrl('bitcoin')}/${currency}`;
    const response = await fetch(url, { method: 'GET' });

    return await this.handeResponse(response);
  }
}
