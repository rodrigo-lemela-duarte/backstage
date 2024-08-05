import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import { LoggerService } from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import express from 'express';
import Router from 'express-promise-router';
import { BitcoinService } from './bitcoin.service';

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

  const bitcoinService = new BitcoinService();

  router.get('/:currency', async (request, response) => {
    const currency: string = request.params.currency;

    try {
      const serviceResponse = await bitcoinService.getByCurrency(currency);
      return response.status(200).send(serviceResponse);
    } catch (error) {
      return response.status(500).send({
        status: "failed",
        message: "error while getting bitcoin values"
      })
    }
  });

  const middleware = MiddlewareFactory.create({ logger, config });

  router.use(middleware.error());
  return router;
}
