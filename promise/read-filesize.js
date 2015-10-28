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
    return arr.map((item) => {
        return getFile(item);
    });
}

readDir('../promise').then((pathArr) => {
    Promise.all(promisification(pathArr)).then((data) => {
        data.forEach((item) => {
            summ += item.size;
        });
        console.log('Size of files in dir: ', summ);
    }).catch(console.log);
}).catch(console.log);
