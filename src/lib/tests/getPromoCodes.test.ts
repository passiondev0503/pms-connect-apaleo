import { createApaleoAdatperInstance } from './helpers';

test('Get list of promo codes ', async () => {
  const apaleo = createApaleoAdatperInstance();
  const promoCodeData = await apaleo.getPromoCodes('BER');

  expect(promoCodeData).toHaveProperty('data');
  expect(promoCodeData.data.length).toBe(promoCodeData.count);
  expect(promoCodeData.data[0]).toHaveProperty('code');
});
