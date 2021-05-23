var express = require('express');
var cors_proxy = require('cors-anywhere');

var cors_port = 5001;

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(cors_port, 'localhost', function() {
    console.log('Running CORS Anywhere on ' + "localhost" + ':' + cors_port);
});


var app = express();
app.use('/', express.static(__dirname + '/'));
app.listen(5000, function() { console.log('listening'); });