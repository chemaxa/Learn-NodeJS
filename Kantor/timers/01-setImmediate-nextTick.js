// демонстрирует, что setImmediate после IO, а nextTick - до IO
// в текущей реализации таймеры тоже до IO, но в документации к Node об этом нет (может измениться)

var fs = require('fs');

fs.open(__filename, "r", function(err, result) {
  console.log("IO!");
});


for(var i=0; i<5; i++) {
  // После IO
  setImmediate(function() {
    console.log("immediate");
  });

  // Перед IO
  process.nextTick(function() {
    console.log("nextTick");
  });

  // Перед IO
  setTimeout(function() {
    console.log("timeout");
  }, 0);
}


console.log("start!");
