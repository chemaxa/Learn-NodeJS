// Refactored basic example w/ multiple modules

var mongoose = require('./mongoose');
var User = require('./user');

var mary = new User({
  email: 'mary@mail.com'
});

// no error handling here (bad)
User.remove({}, function(err) {

  mary.save(function(err, result) {
    console.log(result);

    User.findOne({
      email: 'mary@mail.com'
    }, function(err, user) {
      console.log(user);

      // ... do more with mary

      // no unref!
      mongoose.disconnect();
    });

  });

});









