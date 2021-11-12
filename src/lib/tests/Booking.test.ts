import { createApaleoAdatperInstance } from './helpers';


describe("Booking api", () => {


    test.only("Book reservations", async () => {

        let apaleo = createApaleoAdatperInstance();

        await apaleo.bookReservations(1, {
            booker: {
                first_name: "Bob",
                last_name: "TK",
                title: "mr",
                country_code: "IN"
            },
            channel_code: "Ibe",
            reservations: [
                {
                    adults: 1,
                    arrival: "2021-11-14",
                    departure: "2021-11-16",
                    external_id: `PMS_CONNECT_TEST_LIB_${Date.now()}`,
                    children_ages: [],
                    time_slices: [{
                        rate_plan_id: "BER-NONREF-DBL",
                        total_amount: {
                            amount: 120,
                            currency: "EUR"
                        }
                    }, {
                        rate_plan_id: "BER-NONREF-DBL",
                        total_amount: {
                            amount: 120,
                            currency: "EUR"
                        }
                    }]
                }
            ]
        })

    })
})