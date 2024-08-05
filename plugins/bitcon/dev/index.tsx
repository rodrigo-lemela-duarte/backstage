import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { bitconPlugin, BitconPage } from '../src/plugin';

createDevApp()
  .registerPlugin(bitconPlugin)
  .addPage({
    element: <BitconPage />,
    title: 'Root Page',
    path: '/bitcon',
  })
  .render();
