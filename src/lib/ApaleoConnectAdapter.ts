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
  IConnected_RoomType
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
  IApaleoPromoCodeList,
  IApaleoCancellationPolicyList,
  IApaleoCancellationPolicy,
  IApaleoNoShowPolicyList,
  IApaleoNoShowPolicy,
  IApaleoAgeCategoryList,
  IApaleoAgeCategory,
  IApaleoServiceList,
  IApaleoService, IApaleo_Availibility_UnitType_Response
} from './ApaleoInterfaces';
import { IApaleo_Subscription_Body, IApaleo_Subscription_Response } from './apaleo.subscriptions'
import { Config } from './ApaleoConfig';

import {
  toConnectedHotel,
  toConnectedRoomType,
  toConnectedRatePaln,
  convertToConnectedRate,
  toConnectedCancellationPolicy,
  toConnectedNoShowPolicy,
  toConnectedAgeCategory,
  toConnectedService,
  toConnectedRoomTypeAvailibilityResponse
} from './utils';
import { IConnected_DateRange } from '../../../pms-connect/dist/shared.models';

const defaultLanguageParams = {
  languages: "all"
}

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
      generteAccessToken: async () => {
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

  get name(): string {
    return 'apaleo'
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

    let hotels: IConnected_Hotel[] = res.data.properties.map((p) =>
      toConnectedHotel(p)
    );
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
      {
        params: {
          ...defaultLanguageParams, ...params
        }
      }
    );

    return toConnectedHotel(data);
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
          ...params,
          propertyId: hotelId
        }
      }
    );

    const { count, unitGroups } = data;
    const roomTypes: IConnected_RoomType[] = unitGroups.map((ug) =>
      toConnectedRoomType(ug)
    );
    return {
      count,
      data: roomTypes
    };
  }

  async getRoomTypeById(roomTypeId: ID, params: any = {}): Promise<Models.IConnected_RoomType> {
    const res = await this.http.get<IApaleoUnitGroup>(
      `/inventory/v1/unit-groups/${roomTypeId}`, {
      params: {
        ...defaultLanguageParams,
        ...params
      }
    }
    );

    return toConnectedRoomType(res.data);
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
  ): Promise<Models.IConnected_ListOf<Models.IConnected_RatePlan>> {
    const { data } = await this.http.get<IApaleoRatePlanList>(
      `/rateplan/v1/rate-plans`,
      {
        params: {
          ...params,
          propertyId: hotelId
        }
      }
    );

    let ratePlanItems = data.ratePlans.map((rpi) => toConnectedRatePaln(rpi));
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
      {
        params: {
          ...defaultLanguageParams,
          ...params
        }
      }
    );

    return toConnectedRatePaln(data);
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
          ...params,
          from: ratePlan.rates_range.from,
          to: ratePlan.rates_range.to
        }
      }
    );

    const rates = data.rates.map((r) => convertToConnectedRate(r));

    return {
      count: data.count,
      data: rates
    };
  }

  // CANCELATION POLICIES
  /**
   * Get list of cancellation policies by hotel id
   * @param hotelId
   * @param params
   * @returns
   */
  async getCancellationPolicies(
    hotelId: Models.ID,
    params: any = {}
  ): Promise<Models.IConnected_ListOf<Models.IConnected_CancellationPolicy>> {
    const { data } = await this.http.get<IApaleoCancellationPolicyList>(
      `/rateplan/v1/cancellation-policies`,
      {
        params: {
          ...params,
          propertyId: hotelId
        }
      }
    );

    return {
      data: data.cancellationPolicies.map((cp) =>
        toConnectedCancellationPolicy(cp)
      ),
      count: data.count
    };
  }

  /**
   * Get single cancel policy by id
   * @param cancellationPolicyId
   * @param params
   * @returns
   */

  async getCancellationPolicyById(
    cancellationPolicyId: Models.ID,
    params: any = {}
  ): Promise<Models.IConnected_CancellationPolicy> {
    const { data } = await this.http.get<IApaleoCancellationPolicy>(
      `/rateplan/v1/cancellation-policies/${cancellationPolicyId}`, {
      params: {
        ...defaultLanguageParams,
        ...params
      }
    }
    );
    return toConnectedCancellationPolicy(data);
  }

  // NO SHOW POLICY

  /**
   * Get list of No show policies
   * @param propertyId
   * @param params
   * @returns
   */

  async getNoShowPolicies(
    propertyId: Models.ID,
    params: any = {}
  ): Promise<Models.IConnected_ListOf<Models.IConnected_NoShowPolicy>> {
    const { data } = await this.http.get<IApaleoNoShowPolicyList>(
      '/rateplan/v1/no-show-policies',
      {
        params: {
          ...params,
          propertyId: propertyId
        }
      }
    );
    return {
      data: data.noShowPolicies.map((nsp) => toConnectedNoShowPolicy(nsp)),
      count: data.count
    };
  }

  /**
   * Get single No show policy
   * @param noShowPolicyId
   * @param params
   * @returns
   */
  async getNoShowPolicyById(
    noShowPolicyId: Models.ID,
    params: any = {}
  ): Promise<Models.IConnected_NoShowPolicy> {
    const { data } = await this.http.get<IApaleoNoShowPolicy>(
      `/rateplan/v1/no-show-policies/${noShowPolicyId}`,
      {
        params: {
          ...defaultLanguageParams,
          ...params
        }
      }
    );
    return toConnectedNoShowPolicy(data);
  }

  // AGE CATEGORY

  async getAgeCategories(
    hotelId: Models.ID,
    params?: any
  ): Promise<Models.IConnected_ListOf<Models.IConnected_AgeCategory>> {
    const { data } = await this.http.get<IApaleoAgeCategoryList>(
      `/settings/v1/age-categories`,
      {
        params: {
          ...params,
          propertyId: hotelId
        }
      }
    );

    return {
      data: data.ageCategories.map((a) => toConnectedAgeCategory(a)),
      count: data.count
    };
  }

  async getAgeCategoryById(
    ageCategoryId: Models.ID,
    params?: any
  ): Promise<Models.IConnected_AgeCategory> {
    const { data } = await this.http.get<IApaleoAgeCategory>(
      `/settings/v1/age-categories/${ageCategoryId}`,
      {
        params: {
          ...defaultLanguageParams,
          ...params
        }
      }
    );

    return toConnectedAgeCategory(data);
  }

  async getServices(
    hotelId: Models.ID,
    params: any = {}
  ): Promise<Models.IConnected_ListOf<Models.IConnected_Service>> {
    const { data } = await this.http.get<IApaleoServiceList>(
      `/rateplan/v1/services`,
      {
        params: {
          ...params,
          propertyId: hotelId
        }
      }
    );

    return {
      data: data.services.map((s) => toConnectedService(s)),
      count: data.count
    };
  }

  async getServiceById(
    serviceId: Models.ID,
    params: any = {}
  ): Promise<Models.IConnected_Service> {
    const { data } = await this.http.get<IApaleoService>(
      `/rateplan/v1/services/${serviceId}`, {
      params: {
        ...defaultLanguageParams,
        ...params
      }
    }
    );

    return toConnectedService(data);
  }

  // PROMO CODES

  /**
   *
   * @param hotelId
   * @param params
   * @returns
   */

  async getPromoCodes(
    hotelId: Models.ID,
    params: any = {}
  ): Promise<Models.IConnected_ListOf<Models.IConnected_PromoCode>> {
    const { data } = await this.http.get<IApaleoPromoCodeList>(
      `/rateplan/v1/promo-codes/codes`,
      {
        params: {
          propertyId: hotelId
        }
      }
    );

    let promoCodes: Models.IConnected_PromoCode[] = data.promoCodes.map(
      (pc) => {
        return {
          code: pc.code,
          related_rateplan_ids: pc.relatedRateplanIds
            ? pc.relatedRateplanIds
            : []
        };
      }
    );

    return {
      data: promoCodes,
      count: data.count
    };
  }

  /**
   * Get room type availability
   * @param hotel_id 
   * @param dateRange 
   * @param params 
   * @returns 
   */

  async getAvaialability(hotel_id: Models.ID, dateRange: IConnected_DateRange, params: any = {}): Promise<Models.IConnected_RoomType_AvailabilityResponse> {
    const { data } = await this.http.get<IApaleo_Availibility_UnitType_Response>(`/availability/v1/unit-groups`, {
      params: {
        ...params,
        ...dateRange,
        propertyId: hotel_id
      }
    })

    console
    return toConnectedRoomTypeAvailibilityResponse(data)
  }


  // Web hooks

  async webhooksList(): Promise<Models.IConnected_WebHookDefinition[]> {
    const { data } = await this.http.get<IApaleo_Subscription_Response[]>(`/v1/subscriptions`, {
      baseURL: "https://webhook.apaleo.com"
    })

    if (data) {
      return data.map(d => ({ id: d.id, end_point_url: d.endpointUrl, hotel_ids: d.propertyIds, topics: d.topics }))
    }
    return []
  }

  async webhooksCreate(webhookDefinition: Models.IConnected_WebHookDefinition): Promise<Models.ID> {
    let body: IApaleo_Subscription_Body = {
      endpointUrl: webhookDefinition.end_point_url || '',
      propertyIds: webhookDefinition.hotel_ids || [],
      topics: webhookDefinition.topics || []

    }


    const { data } = await this.http.post<IApaleo_Subscription_Response>(`/v1/subscriptions`, body, {
      baseURL: "https://webhook.apaleo.com",
      // headers: {
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // },
    })
    return data.id
  }
  async webhooksUpdate(id: Models.ID, webhookDefinition: Models.IConnected_WebHookDefinition): Promise<Models.ID> {

    let body: IApaleo_Subscription_Body = {
      endpointUrl: webhookDefinition.end_point_url || '',
      propertyIds: webhookDefinition.hotel_ids || [],
      topics: webhookDefinition.topics || []

    }


    await this.http.put(`/v1/subscriptions/${id}`, body, {
      baseURL: "https://webhook.apaleo.com"
    })
    return id
  }
  async webhooksDelete(webHookId: Models.ID): Promise<ID> {
    await this.http.delete(`/v1/subscriptions/${webHookId}`, {
      baseURL: "https://webhook.apaleo.com"
    })

    return webHookId
  }
}
