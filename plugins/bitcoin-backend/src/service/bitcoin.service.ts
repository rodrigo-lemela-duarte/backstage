import { Bitcoin, BitcoinAPI } from "./type";

export class BitcoinService implements BitcoinAPI {
    async getByCurrency(currency: string): Promise<Bitcoin> {
        const  response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
        
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const responseJSON = await response.json();

        if (responseJSON === undefined || responseJSON === null) {
            throw new Error("RESPOSTA VAZIA");
        }

        if (responseJSON.bpi[currency] === undefined || responseJSON.bpi[currency] === null) {
            return {} as Bitcoin;
        }

        return responseJSON.bpi[currency] as Bitcoin;
    };
}