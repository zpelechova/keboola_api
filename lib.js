import { gotScraping } from 'got-scraping';

export async function updateTransformation(shopId, inputSource, outputDestination, code) {
    // TODO: nicer format of long line
    const url = `https://connection.eu-central-1.keboola.com/v2/storage/components/keboola.snowflake-transformation/configs/${shopId}`;

    const method = 'PUT';
    const formData = {
        configuration: JSON.stringify({
            parameters: {
                blocks: [
                    {
                        name: 'righto',
                        codes: [
                            {
                                name: 'cleaner',
                                script: [code],
                            },
                        ],
                    },
                ],
            },
            storage: {
                input: {
                    tables: [
                        {
                            source: inputSource,
                            destination: 'shop_all',
                        },
                    ],
                },
                output: {
                    tables: [
                        {
                            destination: outputDestination,
                            source: 'finally',
                            primary_key: ['p_key'],
                        },
                    ],
                },
            },
        }),
        changeDescription: 'Playing with API',
    };
    const headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'x-storageapi-token': process.env.KEBOOLA_TOKEN,
    };

    const { body } = await gotScraping({
        useHeaderGenerator: false,
        url,
        method,
        headers,
        form: formData,
    });

    console.dir(JSON.parse(body));
}

export async function getOrCreateTransformation(shopName, suffix) {
    const transformationName = `${shopName}${suffix}`;

    // Check if exists, if so, return id
    const getUrl = 'https://connection.eu-central-1.keboola.com/v2/'
        + 'storage/'
        + 'components'
        + '?componentType=transformation'
        + '&include=configuration';

    const getMethod = 'GET';

    const getHeaders = { 'x-storageapi-token': process.env.KEBOOLA_TOKEN };

    const { body: getBody } = await gotScraping({
        useHeaderGenerator: false,
        url: getUrl,
        method: getMethod,
        headers: getHeaders,
    });

    console.log(getBody);

    const transformationData = JSON.parse(getBody)[0].configurations.find((i) => i.name === shopName + suffix);
    if (transformationData) return transformationData.id;

    // Otherwise, create
    const description = 'This is description of a clean transformation';

    const postUrl = 'https://connection.eu-central-1.keboola.com/v2/storage/components/keboola.snowflake-transformation/configs';
    const postMethod = 'POST';
    const postFormData = {
        name: `${transformationName}`,
        description,
    };
    const postHeaders = {
        'content-type': 'application/x-www-form-urlencoded',
        'x-storageapi-token': process.env.KEBOOLA_TOKEN,
    };

    const { body: postBody } = await gotScraping({
        useHeaderGenerator: false,
        url: postUrl,
        method: postMethod,
        headers: postHeaders,
        form: postFormData,
    });

    console.dir(JSON.parse(postBody));

    return JSON.parse(postBody).id;
}
