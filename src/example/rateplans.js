/**
 * Apaleo 🦁 Rates Adapter javascript example
 *
 */
const { join } = require('path');
const { config } = require('dotenv');
const { ApaleoConnectAdaptor } = require('./../../dist/lib');
// the above line equal to ->  const { ApaleoConnectAdaptor } = require('@cord-travel/pms-connect-apaleo)
config({
  path: join(__dirname, '../../.env')
});

const {
  APALEO_CLIENT_ID = '',
  APALEO_CLIENT_SECRET = '',
  APALEO_REDIRECT_URI,
  TEST_APALEO_REFRESH_TOKEN,
  TEST_APALEO_ACCESS_TOKEN
} = process.env;

const apaleo = new ApaleoConnectAdaptor({
  client_id: APALEO_CLIENT_ID,
  client_secret: APALEO_CLIENT_SECRET,
  redirect_uri: APALEO_REDIRECT_URI,
  refresh_token: TEST_APALEO_REFRESH_TOKEN,
  access_token: TEST_APALEO_ACCESS_TOKEN
});

async function main() {
  const hotels = await apaleo.getHotels();
  console.log(`Getting hotel id 🐹`);

  console.log(`        hotel id : ${hotels.data[0].id} `);

  console.log(`Getting hotel Rate plans of ${hotels.data[0].id}`);
  const ratePlans = await apaleo.getRatePlansByHotelId(hotels.data[0].id);
  console.log(
    `        First Rate Plan  : ${ratePlans.data[0].id} `,
    ratePlans.data[0]
  );
  const singleRatePlan = await apaleo.getRatePlanById(ratePlans.data[0].id);
  console.log(`Single `, singleRatePlan);
}

main().catch((error) => {
  console.log(` Error 👹 `, error);
});
