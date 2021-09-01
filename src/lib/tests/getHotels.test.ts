import { ApaleoConnectAdaptor } from '../ApaleoConnectAdapter';
import { createApaleoAdatperInstance } from './helpers';

let apaleo: ApaleoConnectAdaptor;
beforeEach(() => {
  apaleo = createApaleoAdatperInstance();
});

test('Get list of hotels', async () => {
  const hotels = await apaleo.getHotels();

  expect(hotels).toHaveProperty('data');

  expect(hotels.data.length).toBe(hotels.count);
});

test('Get single hotel', async () => {
  const hotels = await apaleo.getHotels();

  const hotelData = await apaleo.getHotelById(hotels.data[0].id);

  expect(hotelData).toHaveProperty('name');
});
