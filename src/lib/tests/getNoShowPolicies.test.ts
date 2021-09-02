import { createApaleoAdatperInstance } from './helpers';

const noShowPolicyRequiredFields = [
  'id',
  'code',
  'hotel_id',
  'fee',
  'name'
].sort();

describe('No show policies', () => {
  test('Get list of no show policies', async () => {
    let apaleo = createApaleoAdatperInstance();

    const noShowData = await apaleo.getNoShowPolicies('BER');

    expect(noShowData).toHaveProperty('data');

    expect(noShowData.count).toBe(noShowData.data.length);

    expect(noShowData.data[0].hotel_id).toBe('BER');

    noShowPolicyRequiredFields.forEach((prop) => {
      expect(noShowData.data[0]).toHaveProperty(prop);
    });
  });

  test('Get single no show policy', async () => {
    const apaleo = createApaleoAdatperInstance();

    const hotelsData = await apaleo.getHotels();

    const noShowPolicies = await apaleo.getNoShowPolicies(
      hotelsData.data[1].id
    );

    const firstNoShowPolicy = await apaleo.getNoShowPolicyById(
      noShowPolicies.data[0].id
    );

    expect(firstNoShowPolicy.hotel_id).toBe(hotelsData.data[1].id);

    noShowPolicyRequiredFields.forEach((prop) => {
      expect(firstNoShowPolicy).toHaveProperty(prop);
    });
  });
});
