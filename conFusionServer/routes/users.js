var express = require('express');
var router = express.Router();
const bodyParser = require('body-Parser');
const User = require('../models/users');
var passport = require('passport');
var authenticate = require('../authenticate');

router.use(bodyParser.json())
/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });
// router.options("*", cors.corsWithOptions, (req, res) => {res.})
router.post('/signup', (req, res, next) => {
    User.register(new User({username: req.body.username}),
                    req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
            } else {
                if(req.body.firstname){
                    user.firstname = req.body.firstname;
                }
                if(req.body.secondname){
                    user.secondname = req.body.secondname;
                }
                user.save((err, user) => {
                    if(err){
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({err: err});
                    }
                    //double check if the user register right
                    console.log('step into here and going to authenticate');
                    passport.authenticate('local')(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({success : true, status: "Registeration successful!"});
                    });
                })
            }
        });
});
router.post('/login', (req, res, next) => {

     // for more meaningful user login message
     // err: general request err
     // info: user err
     passport.authenticate('local', (err, user, info) => {
          if(err) return next(err);

          if(!user){
               res.statusCode = 401;
               res.setHeader('Content-Type', 'application/jsom');
               res.json({success: false, status: 'Login Unsuccessful!', err: info});
          }
          // try to login user
          req.logIn(user, (err) => {
               if (err) {
                    res.statusCode = 401;
                    res.setHeader('Content-Type', 'application/jsom');
                    res.json({success: false, status: "Login Unsuccessful", err: "Could not login user"});
               }
          //auto generate 401 error if not successful
               var token = authenticate.getToken({_id: req.user._id});
               res.statusCode = 200;
               res.setHeader('Content-Type', 'application/json');
               res.json({success: true, token: token, status: 'You are successfully logged in!'});
          })
     })(req, res, next);
});

router.get('/logout', (req, res, next) => {
  if(req.session){
          req.session.destroy();
          res.clearCookie('session-id');
          res.redirect('/');
}})

// router.get('/checkJWTToken')
module.exports = router;
