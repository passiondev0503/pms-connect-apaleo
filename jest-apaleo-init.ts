import { initializeApp } from './src/lib/TestHelper';

let { APALEO_CLIENT_ID = "", APALEO_CLIENT_SECRET = "", APALEO_REDIRECT_URI = "", TEST_APALEO_REFRESH_TOKEN = "" } = process.env


beforeAll(() => {


    initializeApp(APALEO_CLIENT_ID, APALEO_CLIENT_SECRET, APALEO_REDIRECT_URI)

    
})