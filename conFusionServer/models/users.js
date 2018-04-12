var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    admin: {
        type: Boolean,
        default: false
    }
});

// it will automatically add username and salt-encrypted psw for model
UserSchema.plugin(passportLocalMongoose);

var Users = mongoose.model('User', UserSchema);
module.exports = Users;
