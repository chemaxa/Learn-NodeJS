'use strict';
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {

    var newFile = fs.createWriteStream('destination.jpg');
    var fileBytes = req.headers['content-length'];
    var uploadedBytes = 0;

    /*    req.on('readable', function() {
            var chunk = null;
            while (null !== (chunk = req.read())) {
                uploadedBytes += chunk.length;
                var progress = (uploadedBytes / fileBytes) * 100;
                res.write("Progress: " + parseInt(progress, 10) + "%\n");
            }
        });*/

    req.on('end', function() {
        res.end('uploaded!');
    });

    req.pipe(newFile);

}).listen(8080);

// run with `curl --upload-file <your-file.jpg> http://localhost:8080`
