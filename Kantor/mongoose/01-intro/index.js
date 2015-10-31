// Connecting w/ mongoose, schema, model, basic queries
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var co = require('co');
mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/test', {
  server: {
    socketOptions: {
      keepAlive: 1
    },
    poolSize:      5
  }
});

// this schema can be reused in another schema
var userSchema = new mongoose.Schema({
  email:   {
    type:     String,
    required: "Отсутствует email",
    unique:   true
  },
  friends: [{
    type: ObjectId,
    ref: 'User'
  }],
  created: {
    type:    Date,
    default: Date.now
  }
});

userSchema.methods.sayHi = function() {
  console.log(this.email);
};

userSchema.statics.sayHi = function() {
  console.log(this.schema);
};

var User = mongoose.model('User', userSchema);

User.sayHi();

var mary = new User({
  email: 'mary@mail.com'
});

co(function*() {

  yield User.remove({});

  var mary = yield User.create({
    email: 'mary@mail.com'
  });
  
  var pete = yield User.create({
    email: 'pete@mail.com'
  });

  mary.friends = [pete];

  yield mary.save();

  var maryAgain = yield User.findOne({
    email: 'mary@mail.com'
  }).populate('friends');

  maryAgain.sayHi();
  
})
.catch(err => console.log(err.stack, err.errors))
.then(() => {
  mongoose.disconnect();
});


