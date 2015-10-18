'use strict';
let fs = require('fs'),
    stream = new fs.ReadStream(__filename);

stream.on('readable', () => {
    let data = stream.read();
    console.log(data);
});

stream.on('end', () => {
    console.log('The end');
});
