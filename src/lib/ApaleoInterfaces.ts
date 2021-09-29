import { ID } from '../../../pms-connect/dist/models';

import {
  IApaleoMultiLangauge,
  IApaleoPagination,
  IApaleoBookingPeriodModel,
  IApaleoPeriodModel,
  IApaleoRatesRangeModel,
  IApaleoSurchargeModel
} from './common.inerfaces';

export interface IApaleoBankAccount {
  iban: string;
  bic: string;
  bank: string;
}
export interface IApaeloAccount {
  code: string;

  propertyTemplateId: string;

  isTemplate: boolean;

  name: string;

  description: string;

  companyName: string;
  location: IApaleoAddress;

  timeZone: string;

  currencyCode: string;

  logoUrl: string;
}

interface IApaleoLanguage {
  code: string;
  default: boolean;
  mandatory: boolean;
}

export interface IApaleoAccountLanguageList {
  languages: IApaleoLanguage[];
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
enum APALEO_TIME_SLICE_TEMPLATES {
  DayUse = 'DayUse',
  OverNight = 'OverNight'
}

interface IApaleo_Base_TimeSliceDefinition {
  id: string;
  template: APALEO_TIME_SLICE_TEMPLATES;
  checkInTime: string;
  checkOutTime: string;
  isUsed: boolean;
}

export interface IApaleoTimeSliceDefinition
  extends IApaleo_Base_TimeSliceDefinition {
  name: IApaleoMultiLangauge;
  description: IApaleoMultiLangauge;
}

export interface IApaleoTimeSliceDefinitionItem
  extends IApaleo_Base_TimeSliceDefinition {
  name: string;
  description: string;
}

export interface IApaleoTimeSliceDefinitionList extends IApaleoPagination {
  timeSliceDefinitions: IApaleoTimeSliceDefinitionItem[];
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

interface IApaleo_Base_RatePlan {
  id: string;
  code: string;
  channelCodes: APALEO_CHANNEL_CODES[]; //
  isBookable: boolean;
  minGuaranteeType: APALEO_MIN_GUARANTEE_TYPE[];
  priceCalculationMode?: APALEO_PRICE_CALCULATION_MODE[];
  isSubjectToCityTax: boolean;
  cancellationPolicy: IApaleoCancellationPolicyItem;
  noShowPolicy: IApaleoNoShowPolicyItem;
  timeSliceDefinition: IApaleoTimeSliceDefinitionItem;
  bookingPeriods?: IApaleoBookingPeriodModel[];
  ratesRange?: IApaleoRatesRangeModel;
  promoCodes?: string[];
  surcharges?: IApaleoSurchargeModel[];
  restrictions: IApaleoBookingRestrictionsModel;
  pricingRule?: IApaleoPricingRuleModel;
  ageCategories?: IApaleoRatePlanAgeCategoryModel[];
  includedServices?: IApaleoRatePlanServiceModel[];
}

export interface IApaleoRatePlan extends IApaleo_Base_RatePlan {
  name: IApaleoMultiLangauge;
  description: IApaleoMultiLangauge;
}

export interface IApaleoRatePlanItem extends IApaleo_Base_RatePlan {
  name: string;
  description: string;
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

// Promo Code

export interface IApaleoPromoCode {
  id?: string;
  code: string;
  relatedRateplanIds: string[];
}

export interface IApaleoPromoCodeList extends IApaleoPagination {
  promoCodes: IApaleoPromoCode[];
}

// Cancellation policy
enum APALEO_REFRENCE {
  PriorToArrival = 'PriorToArrival',
  AfterBooking = 'AfterBooking'
}
interface IApaleoBaseCancellationPolicy {
  id: string;
  code: string;
  propertyId: string;
  periodFromReference: IApaleoPeriodModel;
  reference: APALEO_REFRENCE;

  fee?: IApaleoFeeDetailsModel;
}

export interface IApaleoCancellationPolicyItem
  extends IApaleoBaseCancellationPolicy {
  name: string;
  description: string;
}

export interface IApaleoCancellationPolicyList extends IApaleoPagination {
  cancellationPolicies: IApaleoCancellationPolicyItem[];
}

export interface IApaleoCancellationPolicy
  extends IApaleoBaseCancellationPolicy {
  name: IApaleoMultiLangauge;
  description: IApaleoMultiLangauge;
}
interface IApaleoFeeDetailsModel {
  vatType: string;
  fixedValue?: IApaleoMonetaryValue;
  percentValue?: IApaleoPercentValueModel;
}

interface IApaleoPercentValueModel {
  percent: number;
  limit?: number;
  includeServiceIds?: string[];
}

export interface IApaleoNoShowPolicy {
  id: string;
  code: string;
  propertyId: string;
  name: string;
  description: string;
  fee: IApaleoFeeDetailsModel;
}

export interface IApaleoNoShowPolicyList extends IApaleoPagination {
  noShowPolicies: IApaleoNoShowPolicy[];
}

// Age category

export interface IApaleoAgeCategory {
  id: string;
  code: string;
  propertyId: string;
  minAge: number;
  maxAge: number;
  name: string;
}

export interface IApaleoAgeCategoryList extends IApaleoPagination {
  ageCategories: IApaleoAgeCategory[];
}

// Services

enum APALEO_SERVICE_PRICING_UNIT {
  Room = 'Room',
  Person = 'Person'
}

enum APALEO_SERVICE_TYPES {
  Other = 'Other',
  Accommodation = 'Accommodation',
  FoodAndBeverages = 'Accommodation'
}
interface IApaleo_Base_Service {
  id: string;
  code: string;
  defaultGrossPrice: IApaleoMonetaryValue;
  pricingUnit: APALEO_SERVICE_PRICING_UNIT;
  availability: ApaleoEmbed_AvailabilityModel;
  channelCodes: APALEO_CHANNEL_CODES[];
  serviceType: APALEO_SERVICE_TYPES;
}

export interface IApaleoServiceItem extends IApaleo_Base_Service {
  name: string;
  description: string;
}

export interface IApaleoService extends IApaleo_Base_Service {
  name: IApaleoMultiLangauge;
  description: IApaleoMultiLangauge;
}
export interface IApaleoServiceList extends IApaleoPagination {
  services: IApaleoServiceItem[];
}

enum APALEO_SERVICE_AVAILABILITY_MODE {
  Arrival = 'Arrival',
  Departure = 'Departure',
  Daily = 'Daily'
}

interface ApaleoEmbed_AvailabilityModel {
  mode: APALEO_SERVICE_AVAILABILITY_MODE;
}

// Availibility Response

export interface IApaleo_Availibility_UnitType_Response {
  timeSlices: IApaleo_UnitType_Availability_TimeSlice[];
}

export interface IApaleo_UnitType_Availability_TimeSlice {
  from: string;
  to: string;
  property: IApaleo_AvailabilityValues;
  unitGroups: IApaleo_Avalibility_UnitGroupValues[];
}

export interface IApaleo_AvailabilityValues {
  physicalCount: number;
  houseCount: number;
  soldCount: number;
  occupancy: number;
  sellableCount: number;
  allowedOverbookingCount: number;
  maintenance: IApaleo_AvailibilityMaintenanceValues;
  block: IApaleo_AvailibilityBlockValues;
}

interface IApaleo_AvailibilityMaintenanceValues {
  outOfService: number;
  outOfOrder: number;
  outOfInventory: number;
}
interface IApaleo_AvailibilityBlockValues {
  definite: number;
  tentative: number;
  picked: number;
  remaining: number;
}

export interface IApaleo_Avalibility_UnitGroupValues
  extends IApaleo_AvailabilityValues {
  unitGroup: IApaleo_AvalibilityEmbededUnitType;
}
interface IApaleo_AvalibilityEmbededUnitType {
  id: string;
  code: string;
  name: string;
  description: string;
}
