import { createApaleoAdatperInstance } from './helpers';

const requireProps = ['from', 'to', 'price'];

describe('Rates', () => {
  test('Get rates from a rate plan', async () => {
    const apaleo = createApaleoAdatperInstance();

    const ratePlans = await apaleo.getRatePlansByHotelId('BER');

    const rateData = await apaleo.getRatesByRatePlan(ratePlans.data[0]);

    expect(rateData.data.length).toBe(rateData.count);
    requireProps.forEach((prop) => {
      expect(rateData.data[0]).toHaveProperty(prop);
    });
  });
});
