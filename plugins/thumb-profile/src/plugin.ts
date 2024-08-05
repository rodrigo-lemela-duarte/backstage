import {
  createPlugin,
  createRoutableExtension,
  configApiRef,
  createApiFactory,
  fetchApiRef,
  discoveryApiRef,
} from '@backstage/core-plugin-api';

import { bitcoinApiRef, BitcoinClient } from './api';
import { rootRouteRef } from './routes';

export const thumbProfilePlugin = createPlugin({
  id: 'thumb-profile',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: bitcoinApiRef,
      deps: {
        fetchApi: fetchApiRef,
        discoveryApi: discoveryApiRef,
        configApi: configApiRef,
      },
      factory: ({ fetchApi, discoveryApi, configApi }) =>
        new BitcoinClient({
          fetchApi,
          discoveryApi,
          configApi,
        }),
    }),
  ],
});

export const ThumbProfilePage = thumbProfilePlugin.provide(
  createRoutableExtension({
    name: 'ThumbProfilePage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
