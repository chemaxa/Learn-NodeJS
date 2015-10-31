// kill me in 10 seconds
var timer = setTimeout(function() {
  console.log("done");
  process.exit();
}, 10000);

// // при добавлении этой строки выход будет тут же
timer.unref();
