import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { bitcoinAPIRef } from './types';
import { BitcoinAPIClient } from './api/BitcoinAPIClient';

export const bitcoinPlugin = createPlugin({
  id: 'bitcoin',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: bitcoinAPIRef,
      deps: {
        discoveryApi: discoveryApiRef,
      },
      factory: ({ discoveryApi }) => new BitcoinAPIClient({ discoveryApi }),
    }),
  ],
});

export const BitcoinPage = bitcoinPlugin.provide(
  createRoutableExtension({
    name: 'BitcoinPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
