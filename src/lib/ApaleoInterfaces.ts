import { ID } from '../../../pms-connect/dist/models';

export interface IApaleoMultiLangauge {
  en: string;
  de?: string;
}

export interface IApaleoPagination {
  count: number;
}

export interface IApaleoBankAccount {
  iban: string;
  bic: string;
  bank: string;
}
export interface IApaeloAccount {
  id: string;

  code: string;

  propertyTemplateId: string;

  isTemplate: boolean;

  name: string;

  description: string;

  companyName: string;
  location: IApaleoAddress;

  timeZone: string;

  currencyCode: string;
}

export interface IApaleoPropertyItem {
  id: string;
  code?: string;
  name: string;
  description: string;
  companyName: string;
  managingDirectors?: string;
  commercialRegisterEntry: string;
  taxId: string;
  location: IApaleoAddress;
  bankAccount?: IApaleoBankAccount;
  timeZone: string;
  currencyCode: string;
  isArchived: boolean;
}

export interface IApaleoProperty {
  id: string;
  code: string;
  name: IApaleoMultiLangauge;
  description: IApaleoMultiLangauge;
  companyName: string;
  managingDirectors?: string;
  commercialRegisterEntry: string;
  taxId: string;
  location: IApaleoAddress;
  bankAccount?: IApaleoBankAccount;
  // paymentTerms
  timeZone: string;
  currencyCode: string;
  created: string;
  status: string;
  isArchived: boolean;
}

export interface IApaleoPropertyList extends IApaleoPagination {
  properties: IApaleoPropertyItem[];
}

export interface IApaleoUnitGroup {
  id: string;
  code: string;
  name: IApaleoMultiLangauge;
  memberCount: number; // No of rooms in this type
  description: IApaleoMultiLangauge;
  maxPersons: number;
  rank: number;
  type: string;
  property: IApaleoPropertyItem;
}

// Unit group list or Paginations

export interface IApaleoUnitGroupList extends IApaleoPagination {
  unitGroups: IApaleoUnitGroup[];
}

//WIP

enum APALEO_MIN_GUARANTEE_TYPE {
  PM6Hold = 'PM6Hold',
  CreditCard = 'CreditCard',
  Prepayment = 'Prepayment',
  Company = 'Company'
}

enum APALEO_PRICE_CALCULATION_MODE {
  Truncate = 'Truncate',
  Round = 'Round'
}

enum APALEO_CHANNEL_CODES {
  Direct = 'Direct',
  BookingCom = 'BookingCom',
  Ibe = 'Ibe',
  ChannelManager = 'ChannelManager',
  Expedia = 'Expedia',
  Homelike = 'Homelike',
  Hrs = 'Hrs'
}
enum APALEO_TIME_SLICE {
  DayUse = 'DayUse',
  OverNight = 'OverNight'
}

export interface IApaleoTimeSliceDefinition {
  id: string;
  name: string;
  template: APALEO_TIME_SLICE;
  description: string;
  checkInTime: string;
  checkOutTime: string;
}

export interface IApaleoBookingRestrictionsModel {
  minAdvance: IApaleoPeriodModel;
  maxAdvance: IApaleoPeriodModel;
  lateBookingUntil: string; // Time value
}
export enum PRICE_CALCULATION_TYPE {
  Absolute = 'Absolute',
  Percent = 'Percent'
}
export enum APALEO_PRICING_MODE {
  Included = 'Included',
  Additional = 'Additional'
}
export interface IApaleoPricingRuleModel {
  baseRatePlan: IApaleoRatePlan;
  type: PRICE_CALCULATION_TYPE;
  value: number;
}

export interface IApaleoAgeCategorySurchargeModel {
  adults: number;
  value: number;
}

export interface IApaleoRatePlanAgeCategoryModel {
  id: string;
  surcharges: IApaleoAgeCategorySurchargeModel[];
}

export interface IApaleoRatePlanServiceModel {
  serviceId: string;
  grossPrice: IApaleoMonetaryValue;
  pricingMode?: APALEO_PRICING_MODE;
}

export interface IApaleoRatePlanList extends IApaleoPagination {
  ratePlans: IApaleoRatePlanItem[];
}

export interface IApaleoRatePlanItem {
  id: string;
  code?: string;
  name: string;
  description: string;
  channelCode: APALEO_CHANNEL_CODES[]; //
  isBookable: boolean;
  minGuaranteeType: APALEO_MIN_GUARANTEE_TYPE[];
  priceCalculationMode?: APALEO_PRICE_CALCULATION_MODE[];
  isSubjectToCityTax: boolean;
  cancellationPolicy: IApaleoCancellationPolicy;
  noShowPolicy: IApaleoNoShowPolicyItem;
  timeSliceDefinition: IApaleoTimeSliceDefinition;
  bookingPeriods?: IApaleoBookingPeriodModel;
  ratesRange?: IApaleoRatesRangeModel;
  promoCodes?: string[];
  surcharges?: IApaleoSurchargeModel[];
  restrictions: IApaleoBookingRestrictionsModel;
  pricingRule?: IApaleoPricingRuleModel;
  ageCategories?: IApaleoRatePlanAgeCategoryModel[];
  includedServices?: IApaleoRatePlanServiceModel[];
}
export interface IApaleoRatePlan {
  id: string;
  code: string;
  name: IApaleoMultiLangauge;
  description: IApaleoMultiLangauge;
  channelCodes: APALEO_CHANNEL_CODES[]; //
  isBookable: boolean;
  minGuaranteeType: APALEO_MIN_GUARANTEE_TYPE[];
  priceCalculationMode?: APALEO_PRICE_CALCULATION_MODE[];
  isSubjectToCityTax: boolean;
  cancellationPolicy: IApaleoCancellationPolicy;
  noShowPolicy: IApaleoNoShowPolicyItem;
  timeSliceDefinition: IApaleoTimeSliceDefinition;
  bookingPeriods?: IApaleoBookingPeriodModel[];
  ratesRange?: IApaleoRatesRangeModel;
  promoCodes?: string[];
  surcharges?: IApaleoSurchargeModel[];
  restrictions: IApaleoBookingRestrictionsModel;
  pricingRule?: IApaleoPricingRuleModel;
  ageCategories?: IApaleoRatePlanAgeCategoryModel[];
  includedServices?: IApaleoRatePlanServiceModel[];
}

export interface IApaleoPeriodModel {
  hours: number;
  days: number;
  months: number;
}

export interface IApaleoSurchargeModel {
  adults: number; //The total numbers of adults
  type: string[]; // ENUM: Absolute, Percent
  value: number;
}

export interface IApaleoBookingPeriodModel {
  from: string;
  to: string;
}

export interface IApaleoRatesRangeModel {
  from: string;
  to: string;
}

export interface IApaleoCancellationPolicy {
  id: string;
  code?: string;
  name: string | IApaleoMultiLangauge;
  description: string | IApaleoMultiLangauge;
  periodPriorToArrival: IApaleoPeriodModel;
}

export interface IApaleoNoShowPolicyItem {
  id?: ID;
  code: string;
  name: string | IApaleoMultiLangauge;
  description: string | IApaleoMultiLangauge;
}

export interface IApaleoMonetaryValue {
  amount: number;
  currency: string;
}

export interface IApaleoRate {}

// Other
export interface IApaleoAddress {
  addressLine1: string;
  addressLine2: string;
  postalCode: string;
  city: string;
  regionCode: string;
  countryCode: string;
}

// Rate

export interface IApaleoRateList extends IApaleoPagination {
  rates: IApaleoRate[];
}
export interface IApaleoRate {
  from: string;
  to: string;
  price?: IApaleoMonetaryValue;
  includedServicesPrice?: IApaleoMonetaryValue;
  calculatedPrices?: IApaleoCalculatedRate[];
  restrictions: IApaleoRateRestriction;
}

export interface IApaleoRateRestriction {
  closed: boolean;
  closedOnArrival: boolean;
  closedOnDeparture: boolean;
  minLengthOfStay?: number;
  maxLengthOfStay?: number;
}

export interface IApaleoCalculatedRate {
  adults: number;
  price: IApaleoMonetaryValue;
  includedServicesPrice?: IApaleoMonetaryValue;
}
