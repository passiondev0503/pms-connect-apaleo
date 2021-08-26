/**
 * Apaleo 🦁 Connect Adapter javascript example
 * 
 */
 const { join } = require('path')
const { config } = require('dotenv')
const { createStore }  = require('@cord-travel/pms-connect')
 const { ApaleoConnectAdaptor } = require('../../dist/lib')
 // the above line equal to ->  const { ApaleoConnectAdaptor } = require('@cord-travel/pms-connect-apaleo)
 config({
     path:join(__dirname, '../../.env')
 })
 
 
 
 
 
 const { APALEO_CLIENT_ID = "",
     APALEO_CLIENT_SECRET = "",
     APALEO_REDIRECT_URI,
     TEST_APALEO_REFRESH_TOKEN,
    } = process.env
 
     
 const apaleo = new ApaleoConnectAdaptor({
     client_id: APALEO_CLIENT_ID,
     client_secret: APALEO_CLIENT_SECRET,
     redirect_uri: APALEO_REDIRECT_URI,
     refresh_token: TEST_APALEO_REFRESH_TOKEN
 
 })

 // Create a dummy store
 const dummyDBStore = createStore(async (tokens) => {
    // You can save this new access token and refresh token to db here
    console.log(`🎫  Captured new Access Token 🏆 `, tokens.access_token)
    console.log('')
    
})
// Attach store
apaleo.setTokenStore(dummyDBStore)
     
 
 async function main() {
     console.log(`Getting apaleo account details 🐹`)
     const hotels = await apaleo.getHotels()

     console.log(`|------------------------------------|`)
     console.log(`        ${hotels.count} hotels     `)
     console.log(``)

     hotels.data.forEach(hotel => {
         console.log(` 🏨   ${hotel.name}`)
     })

     console.log(`|------------------------------------|`)



 
 
 }
 
 main().catch(error => {
     console.log(` Error 👹 `, error)
 })