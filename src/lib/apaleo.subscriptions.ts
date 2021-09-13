import {
  IConnected_SubscriptionBody,
  IConnected_SubscriptionDefinition,
  IConnected_WebHookDefinition,
  IConnected_WebHook_CreateResponse
} from '@cord-travel/pms-connect/dist/models';
enum WEBHOOK_SUBSCRIPTION_TOPICS {
  Reservation = 'Reservation',
  Folio = 'Folio',
  Invoice = 'Invoice',
  RatePlan = 'RatePlan',
  Group = 'Group',
  Block = 'Block',
  Unit = 'Unit',
  NightAudit = 'NightAudit',
  Fiscalization = 'Fiscalization',
  Booking = 'Booking',
  Company = 'Company',
  UnitGroup = 'UnitGroup',
  Maintenance = 'Maintenance',
  Account = 'Account',
  Property = 'Property'
}
export interface IApaleo_WebhookSubscription_Response {
  id: string;
  topics: WEBHOOK_SUBSCRIPTION_TOPICS[];
  endpointUrl: string;
  propertyIds: string[];
  created: string;
}

export interface IApaleo_WebkookSubscription_Body {
  topics?: WEBHOOK_SUBSCRIPTION_TOPICS[] | string[];
  endpointUrl: string;
  propertyIds: string[];
}

// ARI Subscription

interface IApaleo_ARISubscription_Base {
  propertyId: string;
  channelCode: string;
  endpointUrl: string;
  ratePlanIds: string[];
  numberOfDays: number;
  enabled: boolean;
}

export interface IApaleo_ARISubscription extends IApaleo_ARISubscription_Base {
  id: string;
}
export interface IApaleo_ARISubscriptionList {
  subscriptions: IApaleo_ARISubscription[];
}
export interface IApaleo_ARISubscription_Body
  extends IApaleo_ARISubscription_Base {}

export function toChannectedSubscription(
  s: IApaleo_ARISubscription
): IConnected_SubscriptionDefinition {
  return {
    id: s.id,
    endpoint_url: s.endpointUrl,
    hotel_id: s.propertyId,
    channel_code: s.channelCode,
    rate_plan_ids: s.ratePlanIds,
    number_of_days: s.numberOfDays
  };
}

export function toApaleoARISubscriptionBody(
  s: IConnected_SubscriptionBody
): IApaleo_ARISubscription_Body {
  return {
    endpointUrl: s.endpoint_url,
    channelCode: s.channel_code,
    ratePlanIds: s.rate_plan_ids,
    propertyId: <string>s.hotel_id,
    numberOfDays: s.number_of_days,
    enabled: s.enabled
  };
}
