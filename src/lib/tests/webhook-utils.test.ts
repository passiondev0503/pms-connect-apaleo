import { toConnectedWebHookPayload, toConnectedARIDataPayload } from '../index';

let requiredWebhookPayloadProps = [
  'entity',
  'type',
  'timestamp',
  'account_id',
  'hotel_id',
  'entity_id'
];

let samplePayload = {
  topic: 'UnitGroup',
  type: 'created',
  id: 'ec5a1fe4-331c-450a-915c-5caa231cc825',
  accountId: 'HFTF',
  propertyId: 'HFTF-AADS',
  data: {
    entityId: 'XPGMSXGF-1'
  },
  timestamp: 1530741026
};

describe('Webhook utitlities ', () => {
  test('toConnectedWebHookPayload ', () => {
    let payload = toConnectedWebHookPayload(samplePayload);

    requiredWebhookPayloadProps.map((prop) => {
      expect(payload).toHaveProperty(prop);
    });
  });
});

describe('Ari data utils', () => {
  let sampleAriPayload = {
    accountId: 'XYZX',
    propertyId: 'MUC',
    timeSlices: [
      {
        from: '2018-11-17T09:00:00+02:00',
        to: '2018-11-18T08:00:00+02:00',
        ratePlanId: 'MUC-NONREF_DBL',
        unitGroupId: 'MUC-DBL',
        available: 23,
        prices: [
          {
            adults: 1,
            price: {
              grossAmount: 123,
              beforeTax: 114.95,
              afterTax: 129.84,
              taxes: {
                vat: 8.05,
                cityTax: 6.84
              },
              currency: 'EUR'
            }
          },
          {
            adults: 2,
            price: {
              grossAmount: 170,
              beforeTax: 158.88,
              afterTax: 179.45,
              taxes: {
                vat: 11.12,
                cityTax: 9.45
              },
              currency: 'EUR'
            }
          }
        ],
        restrictions: {
          minAdvanceBookingPeriod: 'P1M',
          maxAdvanceBookingPeriod: 'P1M14DT12H',
          closed: true,
          closedOnArrival: false,
          closedOnDeparture: false,
          minLengthOfStay: 2,
          maxLengthOfStay: 8
        }
      }
    ]
  };

  test('ToConnectedARI data', () => {
    const ariData = toConnectedARIDataPayload(sampleAriPayload);

    let firstLevelRequiredProps = ['account_id', 'hotel_id', 'time_slices'];

    firstLevelRequiredProps.forEach((prop) => {
      expect(ariData).toHaveProperty(prop);
    });

    let timeslice = ariData.time_slices[0];

    let timeSliceProps = [
      'rateplan_id',
      'room_type_id',
      'available',
      'prices',
      'restrictions',
      'from',
      'to'
    ];

    timeSliceProps.forEach((prop) => {
      expect(timeslice).toHaveProperty(prop);
    });

    let timeSlivePrice = timeslice.prices[0];

    let timeSlivePriceProps = ['adults', 'price'];
    timeSlivePriceProps.forEach((prop) => {
      expect(timeSlivePrice).toHaveProperty(prop);
    });

    let price = timeSlivePrice.price;
    let priceProps = ['gross_amount', 'before_tax', 'after_tax'];

    priceProps.map((prop) => {
      expect(price).toHaveProperty(prop);
    });
  });
});
