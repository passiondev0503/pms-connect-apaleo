import {
    ID, IConnected_CreateBookPayload, IConnected_ReservationCreateBody,
    IConnected_ReservationService,
    IConnected_Guest,
} from '@cord-travel/pms-connect/dist/models';
import { IApaleoAddress, IApaleoMonetaryValue } from './ApaleoInterfaces'
export interface IApaleo_Create_BookingBody {

    booker: IApaleo_Booker
    reservations: IApaleo_IReservationCreateBody[]
    channelCode: string
    bookerComment?: string
    comment?: string
    source?: string
    transactionReference?: string
    paymentAccount?: IApaleo_PaymentAccount
    creditCard?: IApaleo_CreditCard
}

interface IApaleo_Booker {

    title?: string
    firstName?: string
    lastName: string
    middleInitial?: string
    email?: string
    phone?: string
    nationalityCountryCode?: string

    address?: IApaleoAddress
    birthDate?: string

}


interface IApaleo_IReservationCreateBody {

    arrival: string
    departure: string
    adults: number
    externalId: string
    timeSlices: IApaleo_ReservationTimeSlice[]
    childrenAges?: number[]

    services?: IApaleo_ReservationService[]
    primaryGuest?: IApaleo_Guest
    additionalGuests?: IApaleo_Guest[]
    travelPurpose?: string
    pricingType?: string
    prePaymentAmount?: IApaleoMonetaryValue

}

interface IApaleo_ReservationTimeSlice {
    ratePlanId: string
    totalAmount: IApaleoMonetaryValue
}

interface IApaleo_ReservationService {
    serviceId: string
    count: number
    amount: IApaleoMonetaryValue
    dates: IApaleo_ServiceDate[]


}

interface IApaleo_ServiceDate {
    serviceDate: string
    count: number
    amount: IApaleoMonetaryValue
}

interface IApaleo_Guest {

    title?: string
    firstName?: string
    middleInitial?: string
    lastName: string
    email?: string
    phone?: string
    address?: IApaleoAddress
    nationalityCountryCode?: string
    identificationNumber?: number
    identificationType?: string
    company?: IApaleo_PersonCompany


}

interface IApaleo_PersonCompany {
    name: string
    taxId: string
}

interface IApaleo_PaymentAccount {
    accountNumber: string // masked credit card number or last 4 digits
    accountHolder: string // card holder
    expiryMonth: string // The credit card's expiration month
    expiryYear: string
    paymentMethod: string
    payerEmail: string
    payerReference: string
    isVirtual: boolean
    inactiveReason?: string
}
interface IApaleo_CreditCard {
    cardNumber: string
    cardHolder: string
    cvc?: string
    expiryMonth: string
    expiryYear: string
    cardType: string
    payerEmail?: string
    isVirtual?: string
    activationTime?: string
}

// Utilities


export function toApaleoBookingPayload(payload: IConnected_CreateBookPayload): IApaleo_Create_BookingBody {


    let p: IApaleo_Create_BookingBody = {
        reservations: payload.reservations ? payload.reservations.map(toApaleoReservationBody) : [],
        channelCode: payload.channel_code,
        booker: payload.booker ? {
            firstName: payload.booker.first_name,
            lastName: payload.booker.last_name,
            middleInitial: payload.booker.middle_name,
            title: payload.booker.title || undefined,
            birthDate: payload.booker.birth_date || undefined,
            email: payload.booker.email || undefined,
            nationalityCountryCode: payload.booker.country_code || undefined,
            phone: payload.booker.phone || undefined
        } : undefined,
        comment: payload.comment,
        source: payload.source,
        transactionReference: payload.transaction_reference || undefined,

    }

    if (payload.payment_account) {
        let pa = payload.payment_account
        p.paymentAccount = {
            accountHolder: pa.account_holder,
            accountNumber: pa.account_number || undefined,
            expiryMonth: pa.expiry_month || undefined,
            expiryYear: pa.expiry_year || undefined,
            isVirtual: pa.is_virtual || undefined,
            payerEmail: pa.payer_email || undefined,
            payerReference: pa.payer_reference || undefined,
            paymentMethod: pa.payment_method || undefined,
        }
    }

    if (payload.credit_card) {
        let cc = payload.credit_card

        p.creditCard = {
            cardHolder: cc.card_holder || undefined,
            cardNumber: cc.card_number || undefined,
            cardType: cc.card_type || undefined,
            expiryMonth: cc.expiry_month || undefined,
            expiryYear: cc.expiry_year || undefined,
            activationTime: cc.activation_time || undefined,
            cvc: cc.cvc || undefined,
            isVirtual: cc.is_virtual,
            payerEmail: cc.payer_email,

        }
    }

    return p

}

function toApaleoReservationBody(r: IConnected_ReservationCreateBody): IApaleo_IReservationCreateBody {

    let b: IApaleo_IReservationCreateBody = {
        arrival: r.arrival,
        departure: r.departure,
        adults: r.adults,
        externalId: r.external_id,
        timeSlices: r.time_slices.map(ts => {
            return {
                ratePlanId: <string>ts.rate_plan_id,
                totalAmount: ts.total_amount
            }
        }),

    }

    if (r.primary_guest) {
        b.primaryGuest = toApaleoGuest(r.primary_guest)
    }

    if (r.additional_guests) {
        b.additionalGuests = r.additional_guests.map(toApaleoGuest)
    }

    if (r.services) {
        b.services = r.services.map(toApaleoReservationService)
    }



    return b
}



function toApaleoReservationService(s: IConnected_ReservationService): IApaleo_ReservationService {

    return {
        amount: s.amount,
        count: s.count,
        serviceId: <string>s.service_id,
        dates: s.dates ? s.dates.map(d => {
            return {
                serviceDate: d.date,
                amount: d.amount,
                count: d.count
            }
        }) : undefined
    }
}

export interface IApaleo_BookingResponse {


    id: string
    reservations: IApaleo_BookingReservationResponse[]

}
interface IApaleo_BookingReservationResponse {
    id: string
    externalId: string

}


function toApaleoGuest(g: IConnected_Guest): IApaleo_Guest {

    return {
        lastName: g.last_name || '',
        firstName: g.first_name || undefined,
        middleInitial: g.middle_name || undefined,
        email: g.email || undefined,
        identificationNumber: g.identification_number || undefined,
        identificationType: g.identification_type || undefined,
        phone: g.phone || undefined,
        title: g.title || undefined,
        nationalityCountryCode: g.country_code || undefined,
        company: g.company ? {
            name: g.company.name || undefined,
            taxId: g.company.tax_id || undefined
        } : undefined,
        address: {
            addressLine1: g.address.address_line_1 || undefined,
            addressLine2: g.address.address_line_2 || undefined,
            city: g.address.city || undefined,
            countryCode: g.address.country_code || undefined,
            postalCode: g.address.postal_code || undefined,
            regionCode: g.address.country_code || undefined
        },

    }


}