import { createApaleoAdatperInstance } from './helpers';

let subscriptionData = {
  endpoint_url: 'https://webhook-data-console.vercel.app/api/webhooks/three',
  hotel_id: 'BER',
  channel_code: 'ChannelManager',
  rate_plan_ids: ['BER-APALEO-SGL', 'BER-APALEO-DBL'],
  number_of_days: 2,
  enabled: true
};

describe.skip('ARI Subscriptions ', () => {
  test('Create / update/ delete / list ARI Subscription ', async () => {
    const apaleo = createApaleoAdatperInstance();

    // Create
    const sub = await apaleo.createARISubscription(subscriptionData);
    expect(sub).toBeTruthy();

    // List subscriptions
    let subscriptions = await apaleo.getARISubscriptions();
    expect(subscriptions.map((s) => s.id)).toContain(sub);

    // Update
    await apaleo.updateARISubscription(sub, {
      ...subscriptionData,
      number_of_days: 1
    });

    // Get single

    const sd = await apaleo.getARISubscriptionById(sub);

    expect(sd.number_of_days).toBe(1);

    // await apaleo.triggerARISubscriptionEvent(subscriptions[0].id, "sync")

    await apaleo.deleteARISubscription(sub);
  });
});
