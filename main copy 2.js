const Apify = require('apify')
const { gotScraping } = require('got-scraping')

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
        body: JSON.stringify(formData)
    })

    console.dir(JSON.parse(body))
})
