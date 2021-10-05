import Apify from 'apify';
import { gotScraping } from 'got-scraping';
import { config } from 'dotenv';
config();

Apify.main(async () => {
    const shopName = await Apify.getInput();

    const getUrl =
        'https://connection.eu-central-1.keboola.com/v2/storage/components/transformation/configs'
    const getMethod = 'GET'
    const getHeaders = {
        'content-type': 'application/json',
        'x-storageapi-token': process.env.KEBOOLA_TOKEN
    }

    const { body: getBody } = await gotScraping({
        useHeaderGenerator: false,
        url: getUrl,
        method: getMethod,
        headers: getHeaders
    })

    // console.dir(JSON.parse(body));
    const data = JSON.parse(getBody);
    const bucketData = data.find(i => i.name === `#0 ${shopName.shopName}`);
    const bucketId = bucketData.id;

    // check if tranformation dashboard already exists, if yes, return id
    const transformationData = bucketData.rows.find(i => i.name === `dashboard`)
    if (transformationData) {
        Apify.pushData({
            shop: shopName,
            bucketId,
            transformationId: transformationData.id
        })
    
    }

    // Otherwise create
    const postUrl = `https://connection.eu-central-1.keboola.com/v2/storage/components/transformation/configs/${bucketId}/rows`
    const postMethod = 'POST'
    const postHeaders = {
        'content-type': 'application/x-www-form-urlencoded',
        'x-storageapi-token':
            '395-17125-bvfgOWfYTe9KR14ab4krGphGOqaEJWSqXGUFP627'
    }
    const postFormData = {
        name: 'dashboard',
        changeDescription: 'Create transformation dashboard',
        configuration: JSON.stringify({
            backend: 'snowflake',
            type: 'simple',
            queries: [
                '-- Here goes querry'
            ]
        })
    }

    const { body: postBody } = await gotScraping({
        useHeaderGenerator: false,
        url: postUrl,
        method: postMethod,
        headers: postHeaders,
        form: postFormData
    })



    Apify.pushData({
        shop: shopName,
        bucketId,
        transformationId: JSON.parse(postBody).id
    })

})
