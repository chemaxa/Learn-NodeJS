'use strict';

Error.stackTraceLimit = 1e6
require('trace');
require('clarify');
var fs = require('mz/fs');

// Обычный async-код для чтения файла/директории path
//  dir -> return files list
//  file -> return contents
//  
//  
/*
function readAsync(path, callback) {

  fs.stat(path, function(err, stat) {
    if (err) return callback(err);

    if (stat.isDirectory()) {
      fs.readdir(path, function(err, files) {
        if (err) return callback(err);
        callback(null, files);
      });
    } else {
      fs.readFile(path, function(err, content) {
        if (err) return callback(err);
        callback(null, content);
      });
    }

  });
}
*/

function readAsync(path) {
  return fs.stat(path)
    .then(stat => {
      return stat.isDirectory()? fs.readdir(path) : fs.readFile(path);
    });
}

readAsync("blabla")
  .then(function(res) {
    console.log(arguments);
  })

process.on('unhandledRejection', function(err, p) {
  console.log("UNHANDLED", err.message, err.stack, err);
});
