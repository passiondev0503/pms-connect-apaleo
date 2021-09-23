import { ApaleoConnectAdaptor } from '../ApaleoConnectAdapter';
import { createApaleoAdatperInstance } from './helpers';

let apaleo: ApaleoConnectAdaptor;
beforeEach(() => {
  apaleo = createApaleoAdatperInstance();
});

const requiredProps = [
  'id',
  'name',
  'description',
  'timezone',
  'location',
  'currency_code'
];

describe('Hotels ', () => {
  test('Get list of hotels', async () => {
    const hotels = await apaleo.getHotels();

    expect(hotels).toHaveProperty('data');

    expect(hotels.data.length).toBe(hotels.count);

    requiredProps.forEach((prop) => {
      expect(hotels.data[0]).toHaveProperty(prop);
    });
  });

  test('Get single hotel', async () => {
    const hotels = await apaleo.getHotels();

    const hotelData = await apaleo.getHotelById(hotels.data[0].id);



    requiredProps.forEach((prop) => {
      expect(hotelData).toHaveProperty(prop);
    });
  });
});
