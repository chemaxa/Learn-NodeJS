var fs = require('fs');

var fileStream = fs.createReadStream('bad-char.txt', {highWaterMark: 9 /* читать по 9 байт для наглядности */});

var content = '';
fileStream.on('data', function(data) {
  console.log(data);
  content += data;
});

fileStream.on('end', function() {
  // битые символы!
  console.log(content);
});

/*
// наглядно видно ошибку
fileStream.on('data', function(data) {
  console.log(data.toString());
});
*/
