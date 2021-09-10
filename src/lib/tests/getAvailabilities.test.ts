import { createApaleoAdatperInstance } from './helpers';

describe.only('Availability ', () => {
  test('Get unit group availability ', async () => {
    const apaleo = createApaleoAdatperInstance();

    const from = new Date();
    const to = new Date();
    to.setDate(from.getDate() + 10); // add 10 days

    const avaliabilitydata = await apaleo.getAvaialability('BER', {
      from: toIsoDateString(from),
      to: toIsoDateString(to)
    });

    expect(avaliabilitydata).toHaveProperty('time_slices');
    expect(avaliabilitydata.time_slices.length).toBe(11);
    const firstTimeSlice = avaliabilitydata.time_slices[0];

    ['from', 'to', 'room_types', 'total'].forEach((p) => {
      expect(firstTimeSlice).toHaveProperty(p);
    });

    const FirstRoomType = firstTimeSlice.room_types[0];

    ['sellable_count', 'physical_count', 'room_type', 'room_type.id'].forEach(
      (p) => {
        expect(FirstRoomType).toHaveProperty(p);
      }
    );
  });
});

function toIsoDateString(d: Date) {
  return d.toISOString().split('T')[0];
}
