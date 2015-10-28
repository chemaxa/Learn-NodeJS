// Что здесь не так? Как поправить?
var fs = require('fs');
var __filename = 'bad.txt';

var fileIn = fs.createReadStream(__filename, {
    highWaterMark: 100,
    flags: 'r',
    autoClose: true
});

var fileOut = fs.createWriteStream(__filename + ".out", {
    highWaterMark: 100,
    flags: 'w'
});

fileIn.pipe(fileOut);

fileIn.on('error', function(err) {
    if (err) {
        console.log(err);
        fileOut.close();
    }
})
