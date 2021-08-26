import { ApaleoConnectAdaptor } from '../index'
import {  getClientCredentials } from '../TestHelper'
let apaleo: ApaleoConnectAdaptor

beforeEach(() => {

    

    apaleo = new ApaleoConnectAdaptor(getClientCredentials())
    
    
})


test("Get hotels", async () => {

    const hotels = await apaleo.getHotels()

    expect(hotels).toHaveProperty("data")
   expect(hotels.data.length).toBe(hotels.count) 
    
})