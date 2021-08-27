import { Models } from '@cord-travel/pms-connect'
import { IApaleoUnitGroup } from './ApaleoInterfaces'
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