import { createApaleoAdatperInstance } from './helpers';

const requiredProps = [
  'id',
  'hotel_id',
  'code',
  'name',
  'description',
  'max_capacity',
  'no_of_rooms'
];

describe('Room types', () => {
  test('get roomtypes from first item of hotel list ', async () => {
    const apaleo = createApaleoAdatperInstance();

    const hotelData = await apaleo.getHotels();

    const roomTypeData = await apaleo.getRoomsTypes(hotelData.data[0].id);

    expect(roomTypeData.count).toBe(roomTypeData.data.length);

    requiredProps.forEach((prop) => {
      expect(roomTypeData.data[0]).toHaveProperty(prop);
    });
  });

  test('Get single room type ', async () => {
    const apaleo = createApaleoAdatperInstance();
    const hotelData = await apaleo.getHotels();

    const roomTypeListData = await apaleo.getRoomsTypes(hotelData.data[0].id);

    const roomType = await apaleo.getRoomTypeById(roomTypeListData.data[0].id);

    requiredProps.forEach((prop) => {
      expect(roomType).toHaveProperty(prop);
    });
  });
});
