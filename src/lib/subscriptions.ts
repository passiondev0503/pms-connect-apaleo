import {
  IConnected_SubscriptionBody,
  IConnected_SubscriptionDefinition,
  IConnected_WebHookDefinition,
  IConnected_WebHook_CreateResponse
} from '@cord-travel/pms-connect/dist/models';

export enum APALEO_WEBHOOK_TOPICS {
  Account = 'Account',
  Property = 'Property',
  Reservation = 'Reservation',
  Booking = 'Booking',
  Company = 'Company',
  Group = 'Group',
  Block = 'Block',
  Unit = 'Unit',
  UnitGroup = 'UnitGroup',
  Folio = 'Folio',
  Invoice = 'Invoice',
  RatePlan = 'RatePlan',
  NightAudit = 'NightAudit',
  Maintenance = 'Maintenance',
  System = 'System'
}

export enum APALEO_WEBHOOK_EVENT_TYPES {
  healthcheck = 'healthcheck',
  'set-to-live' = 'set-to-live',
  suspended = 'suspended',
  created = 'created',
  changed = 'changed',
  deleted = 'deleted',
  amended = 'amended',
  'checked-in' = 'checked-in',
  'checked-out' = 'checked-out',
  'set-to-no-show' = 'set-to-no-show',
  'unit-assigned' = 'unit-assigned',
  'unit-unassigned' = 'unit-unassigned',
  canceled = 'canceled',
  confirmed = 'confirmed',
  released = 'released',
  washed = 'washed',
  closed = 'closed',
  'balance-changed' = 'balance-changed',
  reopened = 'reopened',
  'charges-changed' = 'charges-changed',
  'charge-posted' = 'charge-posted',
  'debitor-changed' = 'debitor-changed',
  'transitory-charge-posted' = 'transitory-charge-posted',
  'allowance-posted' = 'allowance-posted',
  'payment-posted' = 'payment-posted',
  'refund-posted' = 'refund-posted',
  'charge-moved-from-folio' = 'charge-moved-from-folio',
  'transitory-charge-moved-from-folio' = 'transitory-charge-moved-from-folio',
  'payment-moved-from-folio' = 'payment-moved-from-folio',
  'refund-moved-from-folio' = 'refund-moved-from-folio',
  'charge-moved-to-folio' = 'charge-moved-to-folio',
  'transitory-charge-moved-to-folio' = 'transitory-charge-moved-to-folio',
  'payment-moved-to-folio' = 'payment-moved-to-folio',
  'refund-moved-to-folio' = 'refund-moved-to-folio',
  'succeeded' = 'succeeded'
}
export interface IApaleo_WebhookSubscription_Response {
  id: string;
  topics: APALEO_WEBHOOK_TOPICS[];
  endpointUrl: string;
  propertyIds: string[];
  created: string;
}

export interface IApaleo_WebkookSubscription_Body {
  topics?: APALEO_WEBHOOK_TOPICS[] | string[];
  endpointUrl: string;
  propertyIds: string[];
}

export interface IApaleo_Webhook_Payload {
  topic: APALEO_WEBHOOK_TOPICS;
  type: APALEO_WEBHOOK_EVENT_TYPES;
  id: string;
  accountId: string;
  propertyId: string;
  data: IApaleoWebHookPayloadData;
  timestamp: number;
}

export interface IApaleoWebHookPayloadData {
  entityId: string;
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

// ARI Data

interface IApaleo_ARIDataRestrictions {
  minAdvanceBookingPeriod: string;
  maxAdvanceBookingPeriod: string;
  closed: boolean;
  closedOnArrival: boolean;
  closedOnDeparture: boolean;
  minLengthOfStay: number;
  maxLengthOfStay: number;
}
export interface IApaleo_ARIDataTimeSlice {
  ratePlanId: string;
  unitGroupId: string;
  available: number;
  restrictions: IApaleo_ARIDataRestrictions;
  prices: IApaleo_ARIDataTimeSlicePrice[];
  from: string;
  to: string;
}

export interface IApaleo_ARIDataPayload {
  accountId: string;
  propertyId: string;
  timeSlices: IApaleo_ARIDataTimeSlice[];
}

export interface IApaleo_ARIDataTimeSlicePrice {
  adults: number;
  price: IApaleoRatePlanPrice;
}

export interface IApaleoRatePlanPrice {
  grossAmount: number;
  beforeTax: number;
  afterTax: number;
  taxes: {
    vat: number;
    cityTax: number;
  };
  currency: string;
}
