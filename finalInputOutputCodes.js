const Apify = require('apify');
const { gotScraping } = require('got-scraping');

const shopName = "shop_cz"

Apify.main(async () => {
    const url = 'https://connection.eu-central-1.keboola.com/v2/storage/components/keboola.snowflake-transformation/configs/298139391';
    const method = 'PUT';
    const formData = {
        configuration: JSON.stringify({
            parameters:{
                blocks:[
                   {
                      name:"righto",
                      codes:[
                         {
                            name:"cleaner",
                            script:[
                               `CREATE TABLE "final" AS SELECT * FROM "shop_all"`
                            ]
                         }
                      ]
                   }
                ]
             },
             storage:{
                input:{
                   tables:[
                      {
                         source:`in.c-black-friday.${shopName}`,
                         destination:"shop_all",
                      }
                   ]
                },
                output:{
                   tables:[
                      {
                         destination:`out.c-0-${shopName}.${shopName}`,
                         source:"finally",
                         primary_key:[
                            "p_key"
                         ]
                      }
                   ]
                }
             },
        }),
        changeDescription: 'Playing with API',
    };
    const headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'x-storageapi-token': '395-17125-VZU9l3T852Owns0LY9JoycL8tF3XkdRwx9q8EXmc',
    };

    const { body } = await gotScraping({
        useHeaderGenerator: false,
        url,
        method,
        headers,
        form: formData,
    });

    console.dir(JSON.parse(body));
});