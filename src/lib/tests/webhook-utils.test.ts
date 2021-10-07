import { toConnectedWebHookPayload } from '../index';

let requiredWebhookPayloadProps = [
  'entity',
  'type',
  'timestamp',
  'account_id',
  'hotel_id',
  'entity_id'
];

let samplePayload = {
  topic: 'UnitGroup',
  type: 'created',
  id: 'ec5a1fe4-331c-450a-915c-5caa231cc825',
  accountId: 'HFTF',
  propertyId: 'HFTF-AADS',
  data: {
    entityId: 'XPGMSXGF-1'
  },
  timestamp: 1530741026
};

describe('Webhook utitlities ', () => {
  test('toConnectedWebHookPayload ', () => {
    let payload = toConnectedWebHookPayload(samplePayload);
    console.log('payload', payload);

    requiredWebhookPayloadProps.map((prop) => {
      expect(payload).toHaveProperty(prop);
    });
  });
});
