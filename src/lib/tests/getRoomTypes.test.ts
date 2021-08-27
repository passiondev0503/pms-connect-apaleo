import { createApaleoAdatperInstance } from './helpers'

test('get roomtypes from first item of hotel list ', async () => {

    const apaleo = createApaleoAdatperInstance();

    const hotelData = await apaleo.getHotels();

    const roomTypeData = await apaleo.getRoomsTypes(hotelData.data[0].id)

    expect(roomTypeData.count).toBe(roomTypeData.data.length)


})



test.only('Get single room type ', async () => {

    const apaleo = createApaleoAdatperInstance();
    const hotelData = await apaleo.getHotels();

    const roomTypeListData = await apaleo.getRoomsTypes(hotelData.data[0].id)

    const roomType = await apaleo.getToomTypeById(roomTypeListData.data[0].id)

    expect(roomType).toHaveProperty('name')
})

