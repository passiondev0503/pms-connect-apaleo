/**
 * Apaleo 🦁 Connect Adapter javascript example
 * 
 */
const { join } = require('path')
const { config } = require('dotenv')
const { ApaleoConnectAdaptor } = require('./../../dist/lib')
// the above line equal to ->  const { ApaleoConnectAdaptor } = require('@cord-travel/pms-connect-apaleo)
config({
    path:join(__dirname, '../../.env')
})





const { APALEO_CLIENT_ID = "",
    APALEO_CLIENT_SECRET = "",
    APALEO_REDIRECT_URI,
    TEST_APALEO_REFRESH_TOKEN,
    TEST_APALEO_ACCESS_TOKEN } = process.env

    
const apaleo = new ApaleoConnectAdaptor({
    client_id: APALEO_CLIENT_ID,
    client_secret: APALEO_CLIENT_SECRET,
    redirect_uri: APALEO_REDIRECT_URI,
    refresh_token: TEST_APALEO_REFRESH_TOKEN,
    access_token: TEST_APALEO_ACCESS_TOKEN

})
    

async function main() {
    console.log(`Getting apaleo account details 🐹`)
    const accountDetail = await apaleo.getAccount()

    console.log(`🦁🦁🦁🦁🦁🦁 ACCOUNT 🦁🦁🦁🦁🦁🦁🦁`)
    console.log("")

    console.log(`        Name : ${accountDetail.name} 🦁`)
    console.log("")

    console.log(`🦁🦁🦁🦁🦁🦁🦁🦁🦁🦁🦁🦁🦁🦁🦁🦁🦁🦁`)


}

main().catch(error => {
    console.log(` Error 👹 `, error)
})