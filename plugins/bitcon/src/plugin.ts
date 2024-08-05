import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const bitconPlugin = createPlugin({
  id: 'bitcon',
  routes: {
    root: rootRouteRef,
  },
});

export const BitconPage = bitconPlugin.provide(
  createRoutableExtension({
    name: 'BitconPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
