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
        'https://connection.eu-central-1.keboola.com/v2/storage/components/kds-team.wr-dynamodb/configs'
    const method = 'POST'
    const formData = {
        name: 'apitest3',
        description,
        configuration: JSON.stringify({
            storage: {
                input: {
                    tables: [
                        {
                            source: `out.c-0-${shopName}.${shopName}`,
                            destination: '${shopName}.csv',
                            where_column: '',
                            where_values: [],
                            where_operator: 'eq',
                            columns: []
                        }
                    ]
                }
            },
            parameters: {
                region: 'eu-central-1',
                table_name: 'all_shops',
                access_key_id: 'AKIAZX7NKEIMAERBXWRC',
                column_config: [
                    { name: 'p_key', type: 'scalar' },
                    { name: 'json', type: 'scalar' }
                ],
                '#access_key_secret': process.env.AWS_TOKEN
            }
        })
    }
    const headers = {
        'content-type': 'application/x-www-form-urlencoded',
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
