export interface IApaleoMultiLangauge {
    en: string
    de?: string
}


export interface IApaleoPagination {
    count: number
}

export interface IApaleoBankAccount {
    iban: string
    bic: string
    bank: string
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
    code?: string
    name: string
    description: string
    companyName: string
    managingDirectors?: string
    commercialRegisterEntry: string
    taxId: string
    location: IApaleoAddress
    bankAccount?: IApaleoBankAccount
    timeZone: string
    currencyCode: string
    isArchived: boolean

}

export interface IApaleoProperty {

    id: string
    code: string
    name: IApaleoMultiLangauge
    description: IApaleoMultiLangauge
    companyName: string
    managingDirectors?: string
    commercialRegisterEntry: string
    taxId: string
    location: IApaleoAddress
    bankAccount?: IApaleoBankAccount
    // paymentTerms
    timeZone: string
    currencyCode: string
    created: string
    status: string
    isArchived: boolean


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
    memberCount: number // No of rooms in this type
    description: IApaleoMultiLangauge
    maxPersons: number
    rank: number
    type: string
    property: IApaleoPropertyItem

}

// Unit group list or Paginations

export interface IApaleoUnitGroupList extends IApaleoPagination {
    unitGroups: IApaleoUnitGroup[]
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