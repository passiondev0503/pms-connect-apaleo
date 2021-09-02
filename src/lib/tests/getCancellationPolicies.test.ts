import { createApaleoAdatperInstance } from './helpers';

const requiredCancellationProps = [
  'id',
  'code',
  'hotel_id',
  'name',
  'description',
  'period_from_reference'
];

describe('Cancellation Policies ', () => {
  test('Get list of cencellations polcies of a hotel', async () => {
    const apaleo = createApaleoAdatperInstance();

    const policies = await apaleo.getCancellationPolicies('BER');
    expect(policies).toHaveProperty('data');
    expect(policies.count).toBe(policies.data.length);
    expect(policies.data[0]).toHaveProperty('id');

    policies.data.forEach((p) => {
      expect(p.hotel_id).toBe('BER');
    });

    // Have all required props?
    requiredCancellationProps.forEach((prop) => {
      expect(policies.data[0]).toHaveProperty(prop);
    });
  });

  test('Get a single cancellation policy ', async () => {
    const apaleo = createApaleoAdatperInstance();

    const policies = await apaleo.getCancellationPolicies('BER');

    const firstPolicy = await apaleo.getCancellationPolicyById(
      policies.data[0].id
    );

    expect(firstPolicy).toHaveProperty('id');
    expect(firstPolicy.hotel_id).toBe('BER');

    requiredCancellationProps.forEach((prop) => {
      expect(firstPolicy).toHaveProperty(prop);
    });
  });
});
