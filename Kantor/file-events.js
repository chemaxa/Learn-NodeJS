// Если было open, то close будет всегда
// Если не был успешно выполнен end, то finish не будет

var s = require('fs').createWriteStream("forbidden/a.txt");

var emit = s.emit;
s.emit = function(event) {
  console.log(event);
  return emit.apply(this, arguments);
};

s.write("123");
s.end("456");


