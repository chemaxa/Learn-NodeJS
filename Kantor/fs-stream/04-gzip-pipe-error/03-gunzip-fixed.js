var zlib = require('zlib');
var fs = require('fs');

fs.createReadStream('bad.gz') // error, no such file!
  .on('error', cleanup)
  .pipe(zlib.createGunzip()) // error, bad format!
  .on('error', cleanup)
  .pipe(fs.createWriteStream('test')) // error, perm denied!
  .on('error', cleanup)
  .on('finish', function() {
    console.log("DONE");
  });

function cleanup() {
  fs.unlink('bad.gz', function(err) {
    /* should be no error, if the file exists, then it is ours */
  });
}
