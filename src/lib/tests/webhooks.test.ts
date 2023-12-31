import { createApaleoAdatperInstance } from './helpers';
import { AxiosError } from 'axios';
describe.skip('Webhooks ', () => {
  test(' webhook create/list/update/delete', async () => {
    // create

    let endPoint = 'https://webhook-data-console.vercel.app/api/webhooks/one';

    const apaleo = createApaleoAdatperInstance();
    let whId = await apaleo
      .webhooksCreate({
        end_point_url: endPoint, //"https://hookb.in/YVDBNJZ1NktQERGGE9BN",
        hotel_ids: ['BER'],
        topics: ['RatePlan', 'UnitGroup']
      })
      .catch((e: AxiosError) => {
        console.log(e.response);
        console.log();
      });

    expect(whId).toBeTruthy();

    // List

    const webhooks = await apaleo.webhooksList();

    // Get by id

    const _wh = await apaleo.webhooksGetById(String(whId));

    expect(_wh.id).toBe(whId);

    // Update

    let testWebHook = webhooks.find((w) => w.id === whId);

    const upWhId = await apaleo
      .webhooksUpdate(testWebHook.id, {
        end_point_url: endPoint,
        hotel_ids: ['BER'],
        topics: ['RatePlan', 'UnitGroup', 'Reservation']
      })
      .catch((e: AxiosError) => {
        console.log(e.response);
      });

    expect(upWhId).toBe(whId);

    await apaleo.webhooksDelete(testWebHook.id);
  });
});
