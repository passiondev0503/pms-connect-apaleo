import { createApaleoAdatperInstance } from './helpers';

const defaultTimeSliceProps = [
  'id',
  'code',
  'name',
  'description',
  'check_in_time'
];

describe('TimeSliceDefinition ', () => {
  test('Get list of timeslice definitions from a hotel', async () => {
    const apaleo = createApaleoAdatperInstance();
    const TSD = await apaleo.getTimeSliceDefinitions('BER');

    expect(TSD).toHaveProperty('data');

    expect(TSD.count).toBe(TSD.data.length);

    defaultTimeSliceProps.forEach((prop) => {
      expect(TSD.data[0]).toHaveProperty(prop);
    });
  });

  test('Get single timeslice definition ', async () => {
    const apaleo = createApaleoAdatperInstance();

    const tsdlist = await apaleo.getTimeSliceDefinitions('BER');

    const tsd = await apaleo.getTimeSliceDefinitionDetail(
      'BER',
      tsdlist.data[0].id
    );

    defaultTimeSliceProps.forEach((prop) => {
      expect(tsd).toHaveProperty(prop);
    });
  });
});
