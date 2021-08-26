import { ITokenValue  } from '@cord-travel/pms-connect'
import { Config } from '.'
import axios, { AxiosRequestConfig } from 'axios'


/**
 * Authorize Apaleo account to access apaleo resources
 * https://apaleo.dev/guides/start/oauth-connection/
 * @returns 
//  */
// export function getAuthorizeUrl(state: string  = Date.now().toString()) {

//     let { client_id,  redirect_uri }  = getClientCredentials()

//     return `${Config.AUTHORIZE_URL}?response_type=code&scope=${Config.CLIENT_SCOPE}&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}`

// }


interface IApaleoGenerateTokenOptions {
    client_id: string
    client_secret: string
    redirect_uri: string
    refresh?: ITokenValue
    code?: string | null

}


/**
 * Token generate request response
 */
export interface IApaleoGenerateTokenResponse {
    access_token: string | ITokenValue
    refresh_token: string | ITokenValue
    
}

export async function ApaleoGenerateAccessToken(options: IApaleoGenerateTokenOptions): Promise<IApaleoGenerateTokenResponse | null> {
    let { client_id, client_secret, redirect_uri } = options
    let payload = options.code ? `grant_type=authorization_code&code=${options.code}&redirect_uri=${redirect_uri}` : `grant_type=refresh_token&refresh_token=${options.refresh}`

    try {
        const response = await axios.request<IApaleoGenerateTokenResponse>({ 
            method:"POST",
            url: Config.GENERATE_TOKEN_URL,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data:`client_id=${client_id}&client_secret=${client_secret}&${payload}`
        })
    
        
    
        return response.data
    }

    catch (e) {
        //TODO: Logger
        console.log('e ',e)
        return null
    }
}