// В этом коде не обрабатываются ошибки.
// Какие? Что надо исправить?
'use strict';
var url = require('url'),
    zlib = require('zlib'),
    http = require('http'),
    fs = require('fs');

function fetch(srcUrl, destPath, callback) {

    var requestOptions = url.parse(srcUrl);
    requestOptions.headers = {
        'accept-encoding': 'gzip,deflate'
    };

    // request - поток, которые делает запрос
    var request = http.get(requestOptions);

    request.on('error', callback);

    // response - поток, из которого мы читаем ответ
    request.on('response', function(response) {
        response.on('error', callback);
        if (response.headers['content-encoding']) {
            response = response
                .pipe(zlib.createUnzip());
        }
        let file = fs.createWriteStream(destPath, {
            flags: 'wx+'
        });
        file.on('error', callback);
        response.pipe(file);
        response.on('error', callback);
        response.on('finish', callback);
    });
}


fetch('http://ya.ru', './result.html', function(err) {
    if (err) console.error(err);
    else console.log('OK!');
});
