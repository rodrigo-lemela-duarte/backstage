export type Bitcoin = {
  code: string;
  symbol: string;
  rate: number;
  description: string;
  rate_floate: number;
};

export interface BitcoinAPI {
    getByCurrency(currency: string): Promise<Bitcoin>;
}