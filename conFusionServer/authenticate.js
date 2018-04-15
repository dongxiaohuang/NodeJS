var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

var User = require('./models/users');
var config = require('./config');

// exports is an object. So, you can attach properties or methods to it.
// The following example exposes an object
//  with a string property in Message.js file.
exports.local = passport.use(new LocalStrategy(User.authenticate())); // authnticate is generate by passport-local-Mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, {expiresIn: 12000});
}

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//retrieve jwt from requests
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
        (jwt_payload, done) => {
            console.log("JWT payload: ", jwt_payload);
            User.findOne({_id: jwt_payload._id}, (err, user) => {
                if(err){
                    return done(err, false);
                }
                else if(user){
                    return done(null, user);
                }else{
                    return done(null, false);
                }
            })
        }));

exports.verifyUser = passport.authenticate('jwt', {session: false});
