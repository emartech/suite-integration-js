'use strict';

const Static = require('node-static');
const port = 1234;

let fileServer = new Static.Server(__dirname + '/../dist', { cache: 0 });

require('http').createServer(function(request, response) {
  request.addListener('end', function() {
    fileServer.serve(request, response);
  }).resume();
}).listen(port);

console.log('Application started:', {
  port: port
});
