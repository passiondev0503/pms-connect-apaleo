import { IGeneratedTokens } from '@cord-travel/pms-connect'

const refresh_token: string = process.env.TEST_APALEO_REFRESH_TOKEN || ''
const access_token: string = process.env.TEST_APALEO_ACCESS_TOKEN || ''



let client_id: string
let client_secret: string;
let redirect_uri: string;

export function initializeApp(clientId: string, clientSecret: string, redirectUri: string) {
    
    client_id = clientId
    client_secret = clientSecret
    redirect_uri = redirectUri


    return {
        client_id,
        client_secret,
        redirect_uri
    }
    
}

export function getClientCredentials() {
    return {
        client_id,
        client_secret,
        redirect_uri,
        refresh_token,
        access_token

    }
}

export function getTestTokens():IGeneratedTokens {
    return { refresh_token, access_token}
}

