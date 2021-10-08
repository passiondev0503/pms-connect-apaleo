import {
  IConnected_Webhook_Payload,
  ICONNECTED_WEBHOOK_EVENT_TYPE,
  ICONNECTED_WEBHOOK_ENTITY
} from '@cord-travel/pms-connect/dist/models';
import {
  IApaleo_Webhook_Payload,
  APALEO_WEBHOOK_TOPICS
} from './subscriptions';

export function toConnectedWebHookPayload(
  p: IApaleo_Webhook_Payload | any
): IConnected_Webhook_Payload | null {
  let type = ICONNECTED_WEBHOOK_EVENT_TYPE[p.type]
    ? ICONNECTED_WEBHOOK_EVENT_TYPE[p.type]
    : null;

  console.log('Apaleo RAW  payload', p);
  console.log('internal type ', type);

  if (!type) return null;

  let entity = null;

  console.log(`internal p.topic `, p.topic);

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

  console.log('internal entity ', entity);

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
