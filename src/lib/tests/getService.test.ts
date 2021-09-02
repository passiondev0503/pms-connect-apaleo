import { createApaleoAdatperInstance } from './helpers';

const defaultServiceProps = [
  'id',
  'code',
  'name',
  'description',
  'default_gross_price'
];

describe('Services ', () => {
  test('Get list of services from a hotel', async () => {
    const apaleo = createApaleoAdatperInstance();
    const servicesData = await apaleo.getServices('BER');

    expect(servicesData).toHaveProperty('data');

    expect(servicesData.count).toBe(servicesData.data.length);

    defaultServiceProps.forEach((prop) => {
      expect(servicesData.data[0]).toHaveProperty(prop);
    });
  });

  test('Get single service ', async () => {
    const apaleo = createApaleoAdatperInstance();

    const { data } = await apaleo.getServices('BER');

    const firstService = await apaleo.getServiceById(data[0].id);

    defaultServiceProps.forEach((prop) => {
      expect(firstService).toHaveProperty(prop);
    });
  });
});
