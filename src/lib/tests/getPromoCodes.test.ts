import { createApaleoAdatperInstance } from './helpers';

const requiredPromoCodeProps = ['code', 'related_rateplan_ids'];

describe('Promocodes ', () => {
  test('Get list of promo codes ', async () => {
    const apaleo = createApaleoAdatperInstance();
    const promoCodeData = await apaleo.getPromoCodes('BER');

    expect(promoCodeData).toHaveProperty('data');
    expect(promoCodeData.data.length).toBe(promoCodeData.count);

    requiredPromoCodeProps.forEach((prop) => {
      expect(promoCodeData.data[0]).toHaveProperty(prop);
    });
  });
});
