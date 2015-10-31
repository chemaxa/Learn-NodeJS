'use strict';

var fs = require('mz/fs');
var co = require('co');
const path = require('path');

function* readFiles(dir) {

    let length = 0;

    const files = yield fs.readdir(dir);

    for(let i = 0; i < files.length; i++) {
        let fullPath = path.join(dir, files[i]);
        let stat = yield fs.stat( fullPath );
        if (stat.isDirectory()) {
            length += yield* readFiles(fullPath);
        } else {
            let content = yield fs.readFile( fullPath ); // stat.size
            length += content.length;
        }
    }

    return length;

}

co(function*() {

    const sum = yield* readFiles('.');

    console.log(sum);

}).catch(err => console.log(err.stack));
