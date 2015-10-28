// ЗАДАЧА - сделать readFile, возвращающее promise
// ЗАДАЧА - прочитать все файлы текущей директории, используя новый readfile
// (последовательно или параллельно - как считаете нужным)
'use strict';
let fs = require('mz/fs'),
    util = require('util'),
    summ = 0;


function getFile(path) {
    return new Promise(function(resolve, reject) {
        fs.stat(path, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}

function readDir(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, data) => {
            if (err) return reject(err);
            if (data.isDirectory()) {
                fs.readdir(path, (err, data) => {
                    if (err) return reject(err);
                    resolve(data);
                });
            }
        });
    });
}

function promisification(arr) {
    let tmp = arr.map((item) => {
        return getFile(item).then((data) => {
            if (data.isFile())
                summ += data.size;
        }).catch(console.log);
    });
    console.log('TMP', tmp);
    return tmp;
}

readDir('../promise').then((pathArr) => {
    Promise.all(promisification(pathArr)).then((sum) => {
        console.log('Summ of files: ', sum);
    }).catch(console.log);
}).catch(console.log);

/*summFileSizes(__filename).then(function(data) {
    if (data.isFile())
        summ += data.size;
    console.log(summ);
}).catch(console.log);
*/
