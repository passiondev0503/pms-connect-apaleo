import { IConnected_WebHookDefinition, IConnected_WebHook_CreateResponse } from '@cord-travel/pms-connect/dist/models'
enum SUBSCRIPTION_TOPICS {
    Reservation = "Reservation", Folio = "Folio",
    Invoice = "Invoice", RatePlan = "RatePlan", Group = "Group", Block = "Block", Unit = "Unit",
    NightAudit = "NightAudit", Fiscalization = "Fiscalization", Booking = "Booking", Company = "Company",
    UnitGroup = "UnitGroup", Maintenance = "Maintenance", Account = "Account", Property = "Property"
}
export interface IApaleo_Subscription_Response {
    id: string
    topics: SUBSCRIPTION_TOPICS[]
    endpointUrl: string
    propertyIds: string[]
    created: string

}

export interface IApaleo_Subscription_Body {

    topics?: SUBSCRIPTION_TOPICS[] | string[]
    endpointUrl: string
    propertyIds: string[]
}