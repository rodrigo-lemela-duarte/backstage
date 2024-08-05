import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { thumbProfilePlugin, ThumbProfilePage } from '../src/plugin';

createDevApp()
  .registerPlugin(thumbProfilePlugin)
  .addPage({
    element: <ThumbProfilePage />,
    title: 'Root Page',
    path: '/thumb-profile',
  })
  .render();
