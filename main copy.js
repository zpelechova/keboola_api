const Apify = require('apify')
const { gotScraping } = require('got-scraping')
const { createTransformation } = require('./finalCreateTransf')

const shopName = 'shop_cz'

Apify.main(async () => {
    await createTransformation(shopName)
    await getShopId(shopName)

    const url =
        'https://connection.eu-central-1.keboola.com/v2/storage/components?componentType=transformation&include=configuration'
    const method = 'GET'
    const headers = {
        'x-storageapi-token': 'process.env.KEBOOLA_TOKEN'
    }

    const { body } = await gotScraping({
        useHeaderGenerator: false,
        url,
        method,
        headers
    })

    const shopData = JSON.parse(body)[0].configurations.find(
        i => i.name === shopName
    )
    const shopId = shopData.id

    console.log(shopId)

    //  console.dir(JSON.parse(body)[0].configurations)
})
