import { createApaleoAdatperInstance } from './helpers';

test('Get rate plans items by hotel id', async () => {
  let apaleo = createApaleoAdatperInstance();
  const hotelData = await apaleo.getHotels();
  const data = await apaleo.getRatePlansByHotelId(hotelData.data[0].id);
  expect(data).toHaveProperty('data');
  expect(data.data.length).toBe(data.count);
});

test.only('Get single rate plan by its id', async () => {
  let apaleo = createApaleoAdatperInstance();
  const hotelData = await apaleo.getHotels();
  const data = await apaleo.getRatePlansByHotelId(hotelData.data[0].id);
  const RatePlan1 = await apaleo.getRatePlanById(data.data[0].id);
  expect(RatePlan1).toHaveProperty('id');
});
