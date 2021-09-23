import { createApaleoAdatperInstance } from './helpers';

describe.only('Languages ', () => {
  test('Get languages ', async () => {
    const apaleo = createApaleoAdatperInstance();

    const languages = await apaleo.getLanguages();

    const language1 = languages[0];

    ['code', 'default'].forEach((p) => {
      expect(language1).toHaveProperty(p);
    });
  });
});

function toIsoDateString(d: Date) {
  return d.toISOString().split('T')[0];
}
