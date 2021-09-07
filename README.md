# PMS Connect Apaleo 🦁 [WIP]

pms-connect Apaelo adapter

## Install

```bash

npm install @cord-travel/pms-connect
npm install @cord-travel/pms-connect-apaleo

```

## Usage

```javascript
const { ApaleoConnectAdaptor } = require('@cord-travel/pms-connect-apaleo');
// initialize new instance
const apaleo = new ApaleoConnectAdaptor({
  client_id: APALEO_CLIENT_ID,
  client_secret: APALEO_CLIENT_SECRET,
  redirect_uri: APALEO_REDIRECT_URI,
  refresh_token: TEST_APALEO_REFRESH_TOKEN,
  access_token: TEST_APALEO_ACCESS_TOKEN
});

const accountDetail = await apaleo.getAccount();
```
