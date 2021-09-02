import { Models } from '@cord-travel/pms-connect';

import {
  IConnected_RatePlan,
  IConnected_Rate,
  IConnected_CancellationPolicy,
  IConnected_NoShowPolicy,
  IConnected_AgeCategory
} from '../../../pms-connect/dist/models';
import {
  IApaleoUnitGroup,
  IApaleoRatePlanItem,
  IApaleoRatePlan,
  IApaleoRate,
  IApaleoCancellationPolicy,
  IApaleoCancellationPolicyItem,
  IApaleoNoShowPolicy,
  IApaleoAgeCategory
} from './ApaleoInterfaces';
export function convertUnitGroupToRoomType(
  unitGroup: IApaleoUnitGroup
): Models.IConnected_RoomType {
  return {
    id: unitGroup.id,
    code: unitGroup.code,
    name: unitGroup.name,
    description: unitGroup.description,
    max_capacity: unitGroup.maxPersons,
    no_of_rooms: unitGroup.memberCount,
    is_active: true
  };
}

// Room rate plan to Connected

export function toConnectedRatePlanItem(
  rp: IApaleoRatePlanItem
): Models.IConnected_RatePlanItem {
  return {
    id: rp.id,
    code: rp.code || '',
    channel_codes: rp.channelCode,
    is_bookable: rp.isBookable,
    description: {
      en: rp.description
    },
    name: {
      en: rp.name
    },
    rates_range: rp.ratesRange
  };
}

export function convertRatePlanToConnectedRatePlan(
  rp: IApaleoRatePlan
): IConnected_RatePlan {
  return {
    id: rp.id,
    code: rp.code,
    name: rp.name,
    description: rp.description,
    rates_range: rp.ratesRange,
    channel_codes: rp.channelCodes,
    minimum_guarantee_type: rp.minGuaranteeType,
    cancellation_policy: rp.cancellationPolicy
      ? {
        id: rp.cancellationPolicy.id,

        name: {
          en:
            typeof rp.cancellationPolicy.name === 'string'
              ? rp.cancellationPolicy.name
              : ''
        },
        description: {
          en:
            typeof rp.cancellationPolicy.description === 'string'
              ? rp.cancellationPolicy.description
              : ''
        }
      }
      : undefined,
    no_show_policy: rp.noShowPolicy
      ? {
        id: rp.noShowPolicy.id,
        name: {
          en: <string>rp.noShowPolicy.name
        },
        description: {
          en: <string>rp.noShowPolicy.description
        }
      }
      : undefined,
    time_slice_definition: rp.timeSliceDefinition
      ? {
        id: rp.timeSliceDefinition.id,
        name: rp.timeSliceDefinition.name,
        description: rp.timeSliceDefinition.description,
        check_in_time: rp.timeSliceDefinition.checkInTime,
        check_out_time: rp.timeSliceDefinition.checkOutTime
      }
      : undefined,
    restrictions: rp.restrictions
      ? {
        late_booking_until: rp.restrictions.lateBookingUntil,
        min_advance: rp.restrictions.minAdvance,
        max_advance: rp.restrictions.maxAdvance
      }
      : undefined,
    pricing_rule: rp.pricingRule
      ? {
        type: rp.pricingRule.type,
        value: rp.pricingRule.value,
        baseRatePlan: convertRatePlanToConnectedRatePlan(
          rp.pricingRule.baseRatePlan
        )
      }
      : undefined,
    age_categories: rp.ageCategories
      ? rp.ageCategories.map((ac) => ({
        id: ac.id,
        surcharges: ac.surcharges.map((sc) => {
          return {
            value: sc.value,
            adults: sc.adults
          };
        })
      }))
      : [],
    included_services: rp.includedServices
      ? rp.includedServices.map((is) => ({
        service_id: is.serviceId,
        gross_price: is.grossPrice,
        pricing_mode: is.pricingMode
      }))
      : [],
    is_bookable: rp.isBookable,
    promo_codes: rp.promoCodes,
    is_subject_to_city_tax: rp.isSubjectToCityTax,
    booking_periods: rp.bookingPeriods,
    price_calculation_mode: rp.priceCalculationMode,
    surcharges: rp.surcharges
      ? rp.surcharges.map((sc) => ({
        adults: sc.adults,
        value: sc.value
        // type: sc.type
      }))
      : []
  };
}

export function convertToConnectedRate(rate: IApaleoRate): IConnected_Rate {
  return {
    from: rate.from,
    to: rate.to,
    price: rate.price || undefined,
    calculated_prices: rate.calculatedPrices
      ? rate.calculatedPrices.map((cp) => ({
        adults: cp.adults,
        price: cp.price,
        included_services_price: cp.includedServicesPrice
      }))
      : [],
    included_services_price: rate.includedServicesPrice
      ? rate.includedServicesPrice
      : undefined,
    restrictions: rate.restrictions
      ? {
        closed: rate.restrictions.closed,
        closed_on_arrival: rate.restrictions.closedOnArrival,
        closed_on_departure: rate.restrictions.closedOnDeparture,
        max_length_of_stay: rate.restrictions.maxLengthOfStay,
        min_length_of_stay: rate.restrictions.minLengthOfStay
      }
      : undefined
  };
}

export function toConnectedCancellationPolicy(
  cp: IApaleoCancellationPolicy | IApaleoCancellationPolicyItem
): IConnected_CancellationPolicy {
  return {
    id: cp.id,
    code: cp.code,
    hotel_id: cp.propertyId,
    name: {
      en: typeof cp.name === 'string' ? cp.name : cp.name.en
      // de: cp.name && cp.name?.de ? cp.name.de : ""
    },
    description: {
      en:
        typeof cp.description === 'string' ? cp.description : cp.description.en
      // de: cp.description && cp.description.de ? cp.description.de : ""
    },
    period_from_reference: cp.periodFromReference,
    fee: cp.fee
      ? {
        vat_type: cp.fee.vatType,
        fixed_value: cp.fee.fixedValue,
        percent_value: cp.fee.percentValue
      }
      : undefined,
    reference: cp.reference
  };
}

export function toConnectedNoShowPolicy(
  nsp: IApaleoNoShowPolicy
): IConnected_NoShowPolicy {
  const { fee = undefined, id, name, description, code, propertyId } = nsp;
  return {
    id,
    code,
    hotel_id: propertyId,
    name: {
      en: name || ''
    },
    description: {
      en: description || ''
    },
    fee: fee
      ? {
        vat_type: fee.vatType,
        fixed_value: fee.fixedValue,
        percent_value: fee.percentValue
      }
      : undefined
  };
}


export function toConnectedAgeCategory(ac: IApaleoAgeCategory): IConnected_AgeCategory {

  return {
    id: ac.id,
    code: ac.code || '',
    hotel_id: ac.propertyId,
    name: {
      en: ac.name,
    },
    min_age: ac.minAge,
    max_age: ac.maxAge
  }

}
