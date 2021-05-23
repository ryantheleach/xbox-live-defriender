var request = require("request");
var apikey = 'SECRET';

var options = { method: 'GET',
  url: 'https://xbl.io/api/v2/friends',
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     'Accept-Encoding': 'gzip, deflate',
     Host: 'xbl.io',
     'Cache-Control': 'no-cache',
     Accept: '*/*',
     'User-Agent': 'PostmanRuntime/7.17.1',
     Authorization: 'Bearer '+apikey,
     'X-Authorization': apikey } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
