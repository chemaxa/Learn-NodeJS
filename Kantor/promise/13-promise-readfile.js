// ЗАДАЧА - сделать readFile, возвращающее promise
// ЗАДАЧА - прочитать все файлы текущей директории, используя новый readfile
// (последовательно или параллельно - как считаете нужным)
var fs = require('fs');

function readFile(path) {
  // ...
}

readFile(__filename).then(function(content) {

}, function(err) {
  console.log(err);
})