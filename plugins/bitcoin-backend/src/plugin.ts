import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';

/**
 * bitcoinPlugin backend plugin
 *
 * @public
 */
export const bitcoinPlugin = createBackendPlugin({
  pluginId: 'bitcoin',
  register(env) {
    env.registerInit({
      deps: {
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
        config: coreServices.rootConfig,
      },
      async init({
        httpRouter,
        logger,
        config,
      }) {
        httpRouter.use(
          await createRouter({
            logger,
            config,
          }),
        );
        httpRouter.addAuthPolicy({
          path: '/:currency',
          allow: 'unauthenticated',
        });
      },
    });
  },
});
