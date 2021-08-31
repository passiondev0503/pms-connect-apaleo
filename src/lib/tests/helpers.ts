import { ApaleoConnectAdaptor } from '../index';
import { getClientCredentials } from '../TestHelper';

export function createApaleoAdatperInstance() {
  return new ApaleoConnectAdaptor(getClientCredentials());
}
