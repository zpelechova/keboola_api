const Apify = require('apify')
const { gotScraping } = require('got-scraping')

const shopName = 'shop_cz'
const transformationName = `${shopName}_clean`
const description = 'This is description of a clean transformation'
const blocks = [
    {
        name: 'lefto',
        codes: [
            {
                name: 'cleaner',
                script: [`CREATE TABLE "final" AS SELECT * FROM "shop_all"`]
            }
        ]
    }
]
const input = {
    tables: [
        {
            source: `in.c-black-friday.${shopName}`,
            destination: 'shop_all'
        }
    ]
}
const output = {
    tables: [
        {
            destination: `out.c-0-${shopName}.${shopName}`,
            source: 'final',
            primary_key: ['p_key']
        }
    ]
}

Apify.main(async () => {
    const url =
        'https://syrup.eu-central-1.keboola.com/orchestrator/orchestrations'
    const method = 'POST'
    const formData = {
        name: 'apitest3'
    }
    const headers = {
        'content-type': 'application/json',
        'x-storageapi-token': 'process.env.KEBOOLA_TOKEN'
    }

    const { body } = await gotScraping({
        useHeaderGenerator: false,
        url,
        method,
        headers,
        form: formData
    })

    console.dir(JSON.parse(body))
})
