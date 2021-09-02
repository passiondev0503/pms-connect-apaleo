import { createApaleoAdatperInstance } from './helpers'


const ageCategoryRequiredProps = ["id", "name", "hotel_id", "min_age", "max_age"]

test("Get list of age categories of a hotel", async () => {

    let apaleo = createApaleoAdatperInstance();

    const ageCategoryData = await apaleo.getAgeCategories("LND")

    expect(ageCategoryData).toHaveProperty("data")
    expect(ageCategoryData.count).toBe(ageCategoryData.data.length)

    ageCategoryRequiredProps.forEach(prop => {

        expect(ageCategoryData.data[0]).toHaveProperty(prop)
    })

})

test.only("Get single age category detail", async () => {

    let apaleo = createApaleoAdatperInstance();

    const ageCategoryData = await apaleo.getAgeCategories("LND")

    const firstAgeCategory = await apaleo.getAgeCategoryById(ageCategoryData.data[0].id)

    ageCategoryRequiredProps.forEach(prop => {

        expect(firstAgeCategory).toHaveProperty(prop)
    })


})