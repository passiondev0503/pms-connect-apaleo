import { createStore } from '@cord-travel/pms-connect';
import { ApaleoConnectAdaptor } from './ApaleoConnectAdapter';
import { getClientCredentials } from './TestHelper';

test('Initialize adapter', async () => {
  let apaleo = new ApaleoConnectAdaptor(getClientCredentials());

  expect(apaleo).toBeInstanceOf(ApaleoConnectAdaptor);
});

test('Get account details', async () => {
  let apaleo = new ApaleoConnectAdaptor(getClientCredentials());

  let account = await apaleo.getAccount();
  expect(account).toHaveProperty('name');
});

test('Apaleo store with custom token store', async () => {
  let apaleo = new ApaleoConnectAdaptor(getClientCredentials());

  // Create custom store

  let tokenStore = createStore(async (tokens) => {});

  apaleo.setTokenStore(tokenStore);

  let account = await apaleo.getAccount();
  expect(account).toHaveProperty('name');
});
