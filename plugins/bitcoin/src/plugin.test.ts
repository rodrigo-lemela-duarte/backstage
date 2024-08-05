import { bitcoinPlugin } from './plugin';

describe('bitcoin', () => {
  it('should export plugin', () => {
    expect(bitcoinPlugin).toBeDefined();
  });
});
