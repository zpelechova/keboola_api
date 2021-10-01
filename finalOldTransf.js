const Apify = require('apify')
const { gotScraping } = require('got-scraping')

Apify.main(async () => {
    const url =
        'https://connection.eu-central-1.keboola.com/v2/storage/components/transformation/configs/278692691/rows/278692709'
    const method = 'PUT'
    const formData = {
        configuration: JSON.stringify({
            output: [],
            queries: [
                'create table blabla as select * from "ikea_cz" -- It worked from nodeJS. This is a sample query\n' +
                    '-- Adjust accordingly to your input mapping, output mapping\n' +
                    '-- and desired functionality.\n' +
                    '-- CREATE TABLE "out_table" AS SELECT * FROM "in_table";'
            ],
            input: [
                {
                    source: 'in.c-black-friday.ikea_cz',
                    destination: 'ikea_cz',
                    datatypes: {
                        currentPrice: {
                            column: 'currentPrice',
                            type: 'INTEGER',
                            length: null,
                            convertEmptyValuesToNull: false
                        }
                    },
                    whereColumn: '',
                    whereValues: [],
                    whereOperator: 'eq',
                    columns: []
                },
                {
                    source: 'in.c-black-friday.ikea_at',
                    destination: 'ikea_at',
                    whereColumn: '',
                    whereValues: [],
                    whereOperator: 'eq',
                    columns: []
                },
                {
                    source: 'in.c-black-friday.ikea_pl',
                    destination: 'ikea_pl',
                    whereColumn: '',
                    whereValues: [],
                    whereOperator: 'eq',
                    columns: []
                }
            ],
            name: 'ikea',
            packages: [],
            requires: [],
            backend: 'snowflake',
            type: 'simple',
            id: '278692709',
            phase: 1,
            disabled: false
        }),
        changeDescription: 'Change Queries in ikea'
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
