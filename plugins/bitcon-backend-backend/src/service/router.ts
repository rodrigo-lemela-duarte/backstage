import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import { LoggerService } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import express from 'express';
import Router from 'express-promise-router';

export interface RouterOptions {
  logger: LoggerService;
  config: Config;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config } = options;

  const router = Router();
  router.use(express.json());

  router.get('/hello', async (req, res) => {
    res.send('Hello World');
  });
  
  router.get('/:currency', async (req, res) => {
    const { currency } = req.params;

    try {
      const apiResponse = await fetch(
        'https://api.coindesk.com/v1/bpi/currentprice.json',
      );
      const apiResponseJson = await apiResponse.json();

      if (apiResponseJson === undefined || apiResponseJson === null) {
        res.status(404);
      } else if (
        apiResponseJson.bpi[currency] === undefined ||
        apiResponseJson.bpi[currency] === null
      ) {
        res.status(404);
      }

      const bitcoin = {
        code: apiResponseJson.bpi[currency].code,
        description: apiResponseJson.bpi[currency].description,
        rate: apiResponseJson.bpi[currency].rate,
        rate_float: apiResponseJson.bpi[currency].rate_float,
        symbol: apiResponseJson.bpi[currency].symbol,
      };

      res.status(200).json(bitcoin);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

  const middleware = MiddlewareFactory.create({ logger, config });

  router.use(middleware.error());
  return router;
}
