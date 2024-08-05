import { ResponseError } from '@backstage/errors';
import { BitcoinApi, Bitcoin } from './types';
import { ConfigApi, DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';

export class BitcoinClient implements BitcoinApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly fetchApi: FetchApi;
  private readonly configApi: ConfigApi;

  constructor(options: {
    discoveryApi: DiscoveryApi;
    fetchApi: FetchApi;
    configApi: ConfigApi;
  }) {
    this.discoveryApi = options.discoveryApi;
    this.fetchApi = options.fetchApi;
    this.configApi = options.configApi;
  }

  static fromConfig(options: {
    fetchApi: FetchApi;
    discoveryApi: DiscoveryApi;
    configApi: ConfigApi;
  }) {
    return new BitcoinClient(options);
  }

  public async getValueByCurrency(currency: string): Promise<Bitcoin> {
    const baseUrl = await this.discoveryApi.getBaseUrl('bitcoin-backend');
    const response = await this.fetchApi.fetch(`${baseUrl}/bitcoin/${currency}`);

    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }

    return await response.json();
  }
}
