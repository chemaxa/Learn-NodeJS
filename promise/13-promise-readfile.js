// ЗАДАЧА - сделать readFile, возвращающее promise
// ЗАДАЧА - прочитать все файлы текущей директории, используя новый readfile
// (последовательно или параллельно - как считаете нужным)
'use strict';
var fs = require('fs');

function readFile(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, function(err, data) {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

readFile(__filename).then(function(content) {
    console.log(content);
}, function(err) {
    console.log(err);
});
