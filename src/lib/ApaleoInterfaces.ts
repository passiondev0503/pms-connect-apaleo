export interface IApaleoMultiLangauge {
    en: string
    de?: string
}


export interface IApaleoPagination {
    count: number
}
export interface IApaeloAccount {
    id: string
    
    code: string;

    propertyTemplateId: string

    isTemplate: boolean;

    name: string

    description: string

    companyName: string
    location: IApaleoAddress;

    timeZone: string

    currencyCode: string
}

export interface IApaleoPropertyItem {

    id: string
    code: string
    name: string
    description: string

}

export interface IApaleoProperty {

    id: string
    code: string
    name: IApaleoMultiLangauge
    description: IApaleoMultiLangauge
    
}

export interface IApaleoPropertyList {
    properties: IApaleoPropertyItem[]
    count: number
}

export interface IApaleoHotel {

}

export interface IApaleoUnitGroup {

    id: string
    code: string
    name: IApaleoMultiLangauge
memberCount: number
description: IApaleoMultiLangauge
maxPersons: number
rank: number
type:string

}

export interface IApaleoUnitGroupList extends IApaleoPagination {
    unitGroups:IApaleoUnitGroup
}


export interface IApaleoUnit {

}

export interface IApaleoRatePlan {

}

export interface IApaleoRate {

}

// Other
export interface IApaleoAddress {
    addressLine1: string
    addressLine2: string
    postalCode: string
    city: string
    regionCode: string
    countryCode: string
}