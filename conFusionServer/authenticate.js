var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/users');


// exports is an object. So, you can attach properties or methods to it.
// The following example exposes an object
//  with a string property in Message.js file.
exports.local = passport.use(new LocalStrategy(User.authenticate())); // authnticate is generate by passport-local-Mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
