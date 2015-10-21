/**
 * Задача
 *
 * Написать сервер, который при 
 * 
 * GET /file 
 * - выдаёт файл file из директории public, 
 *   вместо file может быть любое имя файла
 * - ошибку 404 если файла нет
 * 
 * POST /file
 * - пишет всё тело запроса в файл public/file и выдаёт ОК
 * - если файл уже есть, то выдаёт ошибку 409
 *
 * Поддержка вложенных директорий в этой задаче не нужна,
 * т.е. при наличии / или .. внутри пути сервер должен выдавать ошибку 400
 *
 * Параметры запроса, т.е. ? и после него нужно игнорировать
 * Эти запросы эквивалентны:  /my.png?123 и /my.png?abcd
 */

'use strict';

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mime = require('mime');
const PUBLIC_DIR = path.join(__dirname, 'public');

http.createServer((req, res) => {

  let urlParsed = url.parse(req.url);
  let filename = decodeURI(urlParsed.pathname.slice(1));

  if (!filename) filename = 'index.html';


  if (filename.includes('/') || filename.includes('..')) {
    res.statusCode = 400;
    res.end("Nested paths are not allowed");
  }

  let filepath = path.join(PUBLIC_DIR, filename)

  if (req.method == 'GET') {
    let fileStream = fs.createReadStream(filepath);
    fileStream.pipe(res);

    fileStream
      .on('error', err => {
        if (err.code == 'ENOENT') {
          res.statusCode = 404;
          res.end("Not found");
        } else {
          res.statusCode = 500;
          res.end("Server Error");
          console.error(err);
        }
      })
      .on('open', () => {
        res.setHeader('Content-Type', mime.lookup(filename));
      })

    res
      .on('close', () => {
        fileStream.destroy();
      });
  }
  

  if (req.method == 'POST') {
    let fileStream = new fs.createWriteStream(filepath, {flags :'wx'});
    req.pipe(fileStream);

    let hadErrors = false;

    fileStream.on('error', (err) => {
      if (err.code == 'EEXIST') {
        res.statusCode = 409;
        res.end('File already exists');  
      } else {
        res.statusCode = 500;
        res.end('Server Error');
        console.error(err);
        hadErrors = true;
        fs.unlink(filepath, err => { /* удалить недокачанный файл */ });
      }
    });

    fileStream.on('finish', () => {
      if (!hadErrors) {
        res.end("OK");
      }
    });

    req.on('close', () => {
      hadErrors = true;
      fileStream.destroy();
      fs.unlink(filepath, err => { /* удалить недокачанный файл */ });
    });    
  }
  
}).listen(3000, () => console.log('http://127.0.0.1:3000/'));

