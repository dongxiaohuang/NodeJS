var express = require('express');
var router = express.Router();
const bodyParser = require('body-Parser');
const User = require('../models/users');
router.use(bodyParser.json())
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
    User.findOne({
            username: req.body.username
        })
        .then((user) => {
            if (user !== null) {
                var err = new Error('user ' + req.body.username + ' has been used');
                err.status = 403;
                return next(err);
            } else {
                User.create(req.body)
                    .then((user) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(user)
                    }, (err) => next(err))
                    .catch((err) => next(err));
            }

        })
        .catch((err) => next(err));
});
router.post('/login', (req, res, next) => {
            if(!req.session.user) {
                console.log(req.headers);
                var authHeader = req.headers.authorization;
                if (!authHeader) {
                    var err = new Error('You are not authorized!');
                    res.setHeader('WWW-Authenticate', 'Basic'); // pop up log-in window
                    err.status = 401;
                    return next(err);
                };

                var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString()
                    .split(':');
                var user = auth[0];
                var psw = auth[1];
                // The identity (===) operator behaves identically to the equality (==)
                // operator except no type conversion is done,
                //and the types must be the same to be considered equal.

                User.findOne({
                        username: req.body.username
                    })
                    .then((user) => {
                        if (user === null) {
                            var err = new Error('user ' + req.body.username + ' does not exist');
                            err.status = 403;
                            return next(err);
                        } else if (user.password !== req.body.password) {
                            var err = new Error('Your password is incorrect');
                            err.status = 403;
                            return next(err);
                        } else {
                            req.session.user = 'authenticated';
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/plain');
                            res.end('You are authenticated!')
                        }
                    })
                    .catch((err) => next(err));
            }else{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/plain');
                res.end('You are already authenticated!');
            }
        });
router.get('/logout', (req, res, next) => {
    if(req.session.user){
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
    }else{
        var err = new Error('You are not logged in now!')
        err.status = 403;
        return next(err);
    }
});



        module.exports = router;
