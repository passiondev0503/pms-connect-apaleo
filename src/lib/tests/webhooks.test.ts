import { createApaleoAdatperInstance } from './helpers'
import { AxiosError } from 'axios'
describe("Webhooks ", () => {



    // test("list webhook", async () => {
    //     const apaleo = createApaleoAdatperInstance()
    //     const webhooks = await apaleo.webhooksList()

    //     console.log('webhooks ', webhooks)
    // })

    // test("create webhook", async () => {

    //     const apaleo = createApaleoAdatperInstance()
    //     await apaleo.webhooksCreate({
    //         end_point_url: "https://hookb.in/YVDBNJZ1NktQERGGE9BN",
    //         hotel_ids: ["BER"],
    //         topics: [
    //             "RatePlan", "UnitGroup"
    //         ]
    //     }).catch((e: AxiosError) => {
    //         console.log(e.response)
    //         console.log()
    //     })

    // })

    test("update webhook ", async () => {

        const apaleo = createApaleoAdatperInstance()

        const webhooks = await apaleo.webhooksList()


        await apaleo.webhooksUpdate(webhooks[0].id, {
            end_point_url: "https://hookb.in/YVDBNJZ1NktQERGGE9BN",
            hotel_ids: ["BER"],
            topics: [
                "RatePlan", "UnitGroup", "Reservation"
            ]

        }).catch((e: AxiosError) => {
            console.log(e.response)
        })


    })

    // test("Delete webhook", async () => {

    //     // let id = "e77a35be-ca99-4ecd-897f-a9873f86b342"

    //     const apaleo = createApaleoAdatperInstance()

    //     await apaleo.webhooksDelete(id)


    // })

})