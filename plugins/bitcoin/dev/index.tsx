import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { bitcoinPlugin, BitcoinPage } from '../src/plugin';

createDevApp()
  .registerPlugin(bitcoinPlugin)
  .addPage({
    element: <BitcoinPage />,
    title: 'Root Page',
    path: '/bitcoin',
  })
  .render();
