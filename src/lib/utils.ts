import { Models } from '@cord-travel/pms-connect'
import { IApaleoUnitGroup, IApaleoRatePlanItem } from './ApaleoInterfaces'
export function convertUnitGroupToRoomType(unitGroup: IApaleoUnitGroup): Models.IConnected_RoomType {


    return {
        id: unitGroup.id,
        code: unitGroup.code,
        name: unitGroup.name,
        description: unitGroup.description,
        max_capacity: unitGroup.maxPersons,
        no_of_rooms: unitGroup.memberCount,
        is_active: true
    }

}

// Room rate plan to Connected


export function toConnectedRatePlanItem(rp: IApaleoRatePlanItem): Models.IConnected_RatePlanItem {


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
    }

}