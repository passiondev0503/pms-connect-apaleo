import {
    Models,
    RestRequestDriver,
    IBaseAdapter,
    ITokenValue, IBaseTokenStore
} from '@cord-travel/pms-connect'
import {
    IConnected_ListOf,
    IConnected_Account,
    IConnected_Hotel,
    IConnected_RoomType,
    IConnected_Room
} from '@cord-travel/pms-connect/dist/models'



import { ApaleoGenerateAccessToken } from './Authorization'
import {  IApaeloAccount, IApaleoProperty, IApaleoPropertyList, IApaleoUnitGroupList } from './ApaleoInterfaces'
import { Config } from './ApaleoConfig'

interface ApaleoConnectAdaptorOptions {
    refresh_token: ITokenValue
    access_token?: ITokenValue | null
    client_id: string | null
    client_secret: string | null
    redirect_uri: string | null
    tokenStore?: IBaseTokenStore | null | undefined
}

export class ApaleoConnectAdaptor extends RestRequestDriver implements IBaseAdapter  {

    constructor(options: ApaleoConnectAdaptorOptions) {

        const {  client_id = null, client_secret = null , refresh_token = "", access_token, redirect_uri=""} = options

        if(!client_id || !client_secret) throw new Error('Apaleo client credentials missing')
        super({
            refreshToken: refresh_token,
            accessToken: access_token || '',
            baseUrl: Config.API_BASE_URL,
            generteAccessToken: async (token: string) => {
                const data = await ApaleoGenerateAccessToken(
                    {
                        client_secret,
                        client_id,
                        redirect_uri,
                        refresh: refresh_token
                    }
                )
                if (!data) throw Error('ApaleoConnectAdaptor:generteAccessToken - Cant create access token')
                return data
            
            }

        
        })

        if (options.tokenStore) {
            this.setTokenStore(options.tokenStore)
        }
        
        
    }
    getAuthorizeUrl?(params?: any): string {
        throw new Error('Method not implemented.')
    }
    


    /**
     * Get apaleo account details ( current / authorized account)
     * API Doc: https://api.apaleo.com/swagger/index.html?urls.primaryName=Account%20V1
     * @returns 
     */
    async getAccount(): Promise<IConnected_Account> {
        const res = await this.http.get<IApaeloAccount>(`/account/v1/accounts/current`,)
        return res.data
    }

    /**
     * Get the list of properties.
     * API Doc : https://api.apaleo.com/swagger/index.html?urls.primaryName=Inventory%20V1
     * @param params 
     * @returns 
     */

    async getHotels(params = {}): Promise<IConnected_ListOf<IConnected_Hotel>> {
        const res = await this.http.get<IApaleoPropertyList>('/inventory/v1/properties', { params })
        return { data: res.data.properties, count: res.data.count } 
    }

    /**
     * Get a property by id.
     * @param id 
     * @param params 
     * @returns 
     */
    async getHotelById(id: Models.ID, params = {}): Promise<IConnected_Hotel> {
        const { data } = await this.http.get<IApaleoProperty>(`/inventory/v1/properties${id}`, { params })

        return {
            id: data.id,
            name: data.name.en,
            description: data.description.en
        }
    }

    getRoomsTypes(hotelId: string | number, params?: any): Promise<IConnected_ListOf<IConnected_RoomType>> {
        throw new Error('Method not implemented.')
    }
    async getRooms(hotelId: Models.ID, params: {}): Promise<IConnected_ListOf<IConnected_Room>> {
        //https://api.apaleo.com/inventory/v1/unit-groups?propertyId=BER&pageNumber=1&pageSize=100
        
        const { data } = await this.http.get<IApaleoUnitGroupList>(`/inventory/v1/properties${hotelId}`, { params })
        throw new Error('Method not implemented.');

    }
    getRoomById(roomId: string | null): Promise<Models.IConnected_Room> {
        throw new Error('Method not implemented.');
    }


}