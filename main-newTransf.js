var request = require('request');
var options = {
  'url': '',
  'headers': {
    'authority': 'connection.eu-central-1.keboola.com',
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
    'content-type': 'application/x-www-form-urlencoded',
    'sec-ch-ua-mobile': '?0',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    'x-storageapi-token': '395-17125-VZU9l3T852Owns0LY9JoycL8tF3XkdRwx9q8EXmc',
    'sec-ch-ua-platform': '"Windows"',
    'accept': '*/*',
    'origin': 'https://connection.eu-central-1.keboola.com',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'cors',
    'sec-fetch-dest': 'empty',
    'referer': 'https://connection.eu-central-1.keboola.com/admin/projects/395/transformations-v2',
    'accept-language': 'en-US,en;q=0.9,cs;q=0.8,cs-CZ;q=0.7',
    'cookie': '_ga=GA1.4.2086411805.1569967086; __zlcmid=uYiZxP1zcNrY7S; _ga=GA1.2.331086669.1572901419; G_ENABLED_IDPS=google; _gaCrossDomain=GA1.2.331086669.1572901419; _hjid=baba5d7d-9a81-48d7-90d3-a9ea624b971e; _mkto_trk=id:128-JHR-871&token:_mch-keboola.com-1614937529343-18696; ajs_anonymous_id=%22cb34aeb9-f85c-4210-be93-273ec71d72d0%22; sessionstack-anonymous-9bf6cfdcc9a14c25bf58fa71610825ea=%7B%22value%22%3A%22dc57559d-d833-469a-a109-6a2b73422ee9%22%2C%22expires%22%3A%22Sat%2C%2019%20Mar%202022%2009%3A53%3A06%20GMT%22%7D; sessionstack-active-window-id-9bf6cfdcc9a14c25bf58fa71610825ea=%7B%22value%22%3A1616147614793%2C%22expires%22%3A%22Sat%2C%2019%20Mar%202022%2009%3A53%3A34%20GMT%22%7D; _hp2_id.2099369407=%7B%22userId%22%3A%228553843204602049%22%2C%22pageviewId%22%3A%225555391544280060%22%2C%22sessionId%22%3A%227994645462643555%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; seerid=u_206374934440341380; XSRF-TOKEN=DQIhCbutgkOJGVeUIAVbcvz4; PHPSESSID=ngah8agfgtp055vh51aqr2aau6e2ujbd; SESSION_VERIFY_TOKEN=HAN0IR4LOnkvpqXIrRWHYx5rEaWrJlYo%7CQ2we9JNx0MMXXzZRfxFgVb28do7Ck76XpJu7Cy0BWtMusxWambYNidPbIHWGAfHj'
  },
  form: {
    'name': 'testujuapi2',
    'description': 'ccccccccc',
    'configuration': '{"parameters":{"blocks":[{"name":"Block 1","codes":[]}]}}'
  }
};
/request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
