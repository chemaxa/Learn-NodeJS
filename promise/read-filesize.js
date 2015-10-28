// ЗАДАЧА - сделать readFile, возвращающее promise
// ЗАДАЧА - прочитать все файлы текущей директории, используя новый readfile
// (последовательно или параллельно - как считаете нужным)
'use strict';
let fs = require('mz/fs'),
    util = require('util'),
    summ = 0,
    file = 'text.txt';

function summFileSizes(path) {
    return new Promise(function(resolve, reject) {
        fs.stat(path, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

summFileSizes(file).then(function(data) {
    if (data.isFile())
        summ += util.inspect(data).size;
    console.log(data);
}).catch(console.log);
