import { createApaleoAdatperInstance } from './helpers';

const defaultRatePlanProps = [
  'id',
  'code',
  'name',
  'description',
  'channel_codes',
  'minimum_guarantee_type'
];

describe('Test Rateplans', () => {
  test('Get rate plans items by hotel id', async () => {
    let apaleo = createApaleoAdatperInstance();
    const hotelData = await apaleo.getHotels();
    const data = await apaleo.getRatePlansByHotelId(hotelData.data[0].id);
    expect(data).toHaveProperty('data');
    expect(data.data.length).toBe(data.count);

    defaultRatePlanProps.forEach((prop) => {
      expect(data.data[0]).toHaveProperty(prop);
    });
  });

  test('Get single rate plan by its id', async () => {
    let apaleo = createApaleoAdatperInstance();
    const hotelData = await apaleo.getHotels();
    const data = await apaleo.getRatePlansByHotelId(hotelData.data[0].id);
    const firstRatePlan = await apaleo.getRatePlanById(data.data[0].id);

    [...defaultRatePlanProps, 'restrictions'].forEach((prop) => {
      expect(firstRatePlan).toHaveProperty(prop);
    });
  });
});
