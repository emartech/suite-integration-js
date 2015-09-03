var Static = require('node-static');

var fileServer = new Static.Server(__dirname + '/../dist', { cache: 0 });

require('http').createServer(function(request, response) {
    request.addListener('end', function() {
        fileServer.serve(request, response);
    }).resume();
}).listen(1234);
