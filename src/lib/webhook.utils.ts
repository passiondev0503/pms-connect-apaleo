import {
  IConnected_Webhook_Payload,
  ICONNECTED_WEBHOOK_EVENT_TYPE,
  ICONNECTED_WEBHOOK_ENTITY,
  IConnected_ARIDataPayload,
  IConnected_ARIDataTimeSlice,
  IConnected_TimeSlicePrice
} from '@cord-travel/pms-connect/dist/models';
import {
  IApaleo_Webhook_Payload,
  APALEO_WEBHOOK_TOPICS,
  IApaleo_ARIDataPayload,
  IApaleo_ARIDataTimeSlice,
  IApaleo_ARIDataTimeSlicePrice
} from './subscriptions';

export function toConnectedWebHookPayload(
  p: IApaleo_Webhook_Payload | any
): IConnected_Webhook_Payload | null {
  let type = ICONNECTED_WEBHOOK_EVENT_TYPE[p.type]
    ? ICONNECTED_WEBHOOK_EVENT_TYPE[p.type]
    : null;

  if (!type) return null;

  let entity = null;

  switch (p.topic) {
    case APALEO_WEBHOOK_TOPICS.Property:
      entity = ICONNECTED_WEBHOOK_ENTITY.hotel;
      break;
    case APALEO_WEBHOOK_TOPICS.UnitGroup:
      entity = ICONNECTED_WEBHOOK_ENTITY['room-type'];
      break;
    case APALEO_WEBHOOK_TOPICS.Unit:
      entity = ICONNECTED_WEBHOOK_ENTITY['room'];
      break;
    case APALEO_WEBHOOK_TOPICS.RatePlan:
      entity = ICONNECTED_WEBHOOK_ENTITY['rate-plan'];
      break;

    default:
      let ltopic = p.topic.toLocaleLowerCase();
      entity = ICONNECTED_WEBHOOK_ENTITY[ltopic]
        ? ICONNECTED_WEBHOOK_ENTITY[ltopic]
        : null;
  }

  if (!entity) return null;

  return {
    entity,
    account_id: p.accountId,
    entity_id: p.data.entityId,
    hotel_id: p.propertyId,
    type,
    timestamp: p.timestamp
  };
}

export function toConnectedARIDataPayload(
  d: IApaleo_ARIDataPayload
): IConnected_ARIDataPayload {
  return {
    account_id: d.accountId,
    hotel_id: d.propertyId,
    time_slices: d.timeSlices.map((ts) => toConnectedTimeSlice(ts))
  };
}

function toConnectedTimeSlice(
  ts: IApaleo_ARIDataTimeSlice
): IConnected_ARIDataTimeSlice {
  return {
    available: ts.available,
    from: ts.from,
    to: ts.to,
    rateplan_id: ts.ratePlanId,
    room_type_id: ts.unitGroupId,
    prices: ts.prices ? ts.prices.map((p) => toConnectedTimeslicePrice(p)) : [],
    restrictions: ts.restrictions
      ? {
          closed: ts.restrictions.closed,
          closed_on_arrival: ts.restrictions.closedOnArrival,
          closed_on_departure: ts.restrictions.closedOnDeparture,
          max_length_of_stay: ts.restrictions.maxLengthOfStay,
          min_length_of_stay: ts.restrictions.minLengthOfStay,
          max_advance_booking_period:
            ts.restrictions.maxAdvanceBookingPeriod || undefined,
          min_advance_booking_period:
            ts.restrictions.minAdvanceBookingPeriod || undefined
        }
      : undefined
  };
}

function toConnectedTimeslicePrice(
  p: IApaleo_ARIDataTimeSlicePrice
): IConnected_TimeSlicePrice {
  return {
    adults: p.adults,
    price: {
      gross_amount: p.price.grossAmount,
      after_tax: p.price.afterTax,
      before_tax: p.price.beforeTax,
      currency: p.price.currency,
      taxes: p.price.taxes
        ? {
            vat: p.price.taxes.vat,
            city_tax: p.price.taxes.cityTax
          }
        : undefined
    }
  };
}
