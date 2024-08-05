import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const thumbProfilePlugin = createPlugin({
  id: 'thumb-profile',
  routes: {
    root: rootRouteRef,
  },
});

export const ThumbProfilePage = thumbProfilePlugin.provide(
  createRoutableExtension({
    name: 'ThumbProfilePage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
