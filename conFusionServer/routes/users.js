var express = require('express');
var router = express.Router();
const bodyParser = require('body-Parser');
const User = require('../models/users');
var passport = require('passport');
var authenticate = require('../authenticate');

router.use(bodyParser.json())
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
    User.register(new User({username: req.body.username}),
                    req.body.password, (err, user) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.json({err: err});
            } else {
                //double check if the user register right
                console.log('step into here and going to authenticate');
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success : true, status: "Registeration successful!"});
                });
            }
        });
});
router.post('/login', passport.authenticate('local'), (req, res) => {
    //auto generate 401 error if not successful
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
});



module.exports = router;
