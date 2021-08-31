import {
    Models,
    RestRequestDriver,
    IBaseAdapter,
    ITokenValue,
    IBaseTokenStore
} from '@cord-travel/pms-connect';
import {
    ID,
    IConnected_ListOf,
    IConnected_Account,
    IConnected_Hotel,
    IConnected_RoomType,
    IConnected_Room
} from '@cord-travel/pms-connect/dist/models';

import { ApaleoGenerateAccessToken } from './Authorization';
import {
    IApaeloAccount,
    IApaleoProperty,
    IApaleoPropertyList,
    IApaleoUnitGroupList,
    IApaleoUnitGroup,
    IApaleoRatePlanList,
    IApaleoRatePlan,
    IApaleoRateList,
    IApaleoPromoCodeList
} from './ApaleoInterfaces';
import { Config } from './ApaleoConfig';

import {
    convertUnitGroupToRoomType,
    toConnectedRatePlanItem,
    convertRatePlanToConnectedRatePlan,
    convertToConnectedRate
} from './utils';

interface ApaleoConnectAdaptorOptions {
    refresh_token: ITokenValue;
    access_token?: ITokenValue | null;
    client_id: string | null;
    client_secret: string | null;
    redirect_uri: string | null;
    tokenStore?: IBaseTokenStore | null | undefined;
}

export class ApaleoConnectAdaptor
    extends RestRequestDriver
    implements IBaseAdapter {
    constructor(options: ApaleoConnectAdaptorOptions) {
        const {
            client_id = null,
            client_secret = null,
            refresh_token = '',
            access_token,
            redirect_uri = ''
        } = options;

        if (!client_id || !client_secret)
            throw new Error('Apaleo client credentials missing');
        super({
            refreshToken: refresh_token,
            accessToken: access_token || '',
            baseUrl: Config.API_BASE_URL,
            generteAccessToken: async (token: string) => {
                const data = await ApaleoGenerateAccessToken({
                    client_secret,
                    client_id,
                    redirect_uri,
                    refresh: refresh_token
                });
                if (!data)
                    throw Error(
                        'ApaleoConnectAdaptor:generteAccessToken - Cant create access token'
                    );
                return data;
            }
        });

        if (options.tokenStore) {
            this.setTokenStore(options.tokenStore);
        }
    }


    getRatesByRatePlanId(
        ratePlanId: Models.ID
    ): Promise<Models.IConnected_ListOf<Models.IConnected_Rate>> {
        throw new Error('Method not implemented.');
    }

    getAuthorizeUrl?(params?: any): string {
        throw new Error('Method not implemented.');
    }

    /**
     * Get apaleo account details ( current / authorized account)
     * API Doc: https://api.apaleo.com/swagger/index.html?urls.primaryName=Account%20V1
     * @returns
     */
    async getAccount(): Promise<IConnected_Account> {
        const res = await this.http.get<IApaeloAccount>(
            `/account/v1/accounts/current`
        );
        return res.data;
    }

    // HOTELS

    /**
     * Get the list of properties.
     * API Doc : https://api.apaleo.com/swagger/index.html?urls.primaryName=Inventory%20V1
     * @param params
     * @returns
     */

    async getHotels(params = {}): Promise<IConnected_ListOf<IConnected_Hotel>> {
        const res = await this.http.get<IApaleoPropertyList>(
            '/inventory/v1/properties',
            { params }
        );

        let hotels: IConnected_Hotel[] = res.data.properties.map((prop) => {
            return {
                id: prop.id,
                name: { en: prop.name },
                description: { en: prop.description },
                is_active: true,
                company_name: prop.companyName || '',
                currency_code: prop.currencyCode || ''
            };
        });
        return { data: hotels, count: res.data.count };
    }

    /**
     * Get a property by id.
     * @param id
     * @param params
     * @returns
     */
    async getHotelById(id: ID, params = {}): Promise<IConnected_Hotel> {
        const { data } = await this.http.get<IApaleoProperty>(
            `/inventory/v1/properties/${id}`,
            { params }
        );

        return {
            id: data.id,
            name: data.name,
            description: data.description
        };
    }

    // ROOM TYPES

    async getRoomsTypes(
        hotelId: string | number,
        params: any = {}
    ): Promise<IConnected_ListOf<IConnected_RoomType>> {
        const { data } = await this.http.get<IApaleoUnitGroupList>(
            '/inventory/v1/unit-groups',
            {
                params: {
                    propertyId: hotelId,
                    ...params
                }
            }
        );

        const { count, unitGroups } = data;
        const roomTypes: IConnected_RoomType[] = unitGroups.map((ug) =>
            convertUnitGroupToRoomType(ug)
        );
        return {
            count,
            data: roomTypes
        };
    }

    async getRoomTypeById(roomTypeId: ID): Promise<Models.IConnected_RoomType> {
        const res = await this.http.get<IApaleoUnitGroup>(
            `/inventory/v1/unit-groups/${roomTypeId}`
        );

        return convertUnitGroupToRoomType(res.data);
    }

    // Rateplan

    /**
     *
     * @param hotelId
     * @param params
     * @returns IConnected_RatePlanItem[]
     */

    async getRatePlansByHotelId(
        hotelId: Models.ID,
        params: any = {}
    ): Promise<Models.IConnected_ListOf<Models.IConnected_RatePlanItem>> {
        const { data } = await this.http.get<IApaleoRatePlanList>(
            `/rateplan/v1/rate-plans`,
            {
                params: {
                    propertyId: hotelId
                }
            }
        );

        let ratePlanItems = data.ratePlans.map((rpi) =>
            toConnectedRatePlanItem(rpi)
        );
        return {
            data: ratePlanItems,
            count: data.count
        };
    }

    /**
     * Get single rateplan by its id
     * @param ratePlanId
     * @param params
     * @returns
     */

    async getRatePlanById(
        ratePlanId: Models.ID,
        params?: {}
    ): Promise<Models.IConnected_RatePlan> {
        const { data } = await this.http.get<IApaleoRatePlan>(
            `/rateplan/v1/rate-plans/${ratePlanId}`,
            { params }
        );

        return convertRatePlanToConnectedRatePlan(data);
    }

    /**
     * Get  rates of a specified RatePlan
     * @param ratePlan | ratePlanItem
     * @param params 
     * @returns 
     */

    async getRatesByRatePlan(
        ratePlan: Models.IConnected_RatePlan | Models.IConnected_RatePlanItem,
        params: any = {}
    ): Promise<Models.IConnected_ListOf<Models.IConnected_Rate>> {
        const { data } = await this.http.get<IApaleoRateList>(
            `/rateplan/v1/rate-plans/${ratePlan.id}/rates`,
            {
                params: {
                    from: ratePlan.rates_range.from,
                    to: ratePlan.rates_range.to,
                    ...params
                }
            }
        );

        const rates = data.rates.map((r) => convertToConnectedRate(r));

        return {
            count: data.count,
            data: rates
        };
    }

    // PROMO CODES

    async getPromoCodes(hotelId: Models.ID, params?: any): Promise<Models.IConnected_ListOf<Models.IConnected_PromoCode>> {
        const { data } = await this.http.get<IApaleoPromoCodeList>(`/rateplan/v1/promo-codes/codes`, {
            params: {
                propertyId: hotelId
            }
        })

        let promoCodes: Models.IConnected_PromoCode[] = data.promoCodes.map(pc => {
            return {
                code: pc.code,
                related_rateplan_ids: pc.relatedRateplanIds ? pc.relatedRateplanIds : []
            }
        })

        return {
            data: promoCodes,
            count: data.count
        }
    }




}
