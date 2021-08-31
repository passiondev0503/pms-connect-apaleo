export interface IApaleoMultiLangauge {
    en: string;
    de?: string;
}

export interface IApaleoPagination {
    count: number;
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