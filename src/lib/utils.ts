import { Models } from '@cord-travel/pms-connect';
import { IConnected_RatePlan } from '../../../pms-connect/dist/models';
import {
  IApaleoUnitGroup,
  IApaleoRatePlanItem,
  IApaleoRatePlan
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
            en: <string>rp.cancellationPolicy.name
          },
          description: {
            en: <string>rp.cancellationPolicy.description
          },
          period_prior_to_arrival: rp.cancellationPolicy.periodPriorToArrival
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
