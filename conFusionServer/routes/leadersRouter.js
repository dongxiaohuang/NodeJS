const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Leaders = require('../models/leaders');
let leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
var authenticate = require('../authenticate');

leaderRouter.route('/')
.get((req, res, next) => {
    Leaders.find(req.query) // festured = true
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    })
}, (err) => {next(err)})
.post(authenticate.verifyUser, (req, res, next) => {
    Leaders.create(req.body)
    .then((leaders) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leaders);
    })
    .catch((err) => next(err));
}, (err) => next(err))
.put(authenticate.verifyUser, (req, res, next) => {
  var err = (req.method + ' not supported!');
  err.status = 403;
  next(err);
}, (err) => next(err))
.delete(authenticate.verifyUser, (req, res, next) => {
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch(err => next(err));
}, (err) => next(err))



leaderRouter.route('/:leaderID')
.get((req, res, next) => {
    Leaders.findById(req.params.leaderID)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    })
    .catch((err) => {next(err)});
}, (err) => {next(err)})
.post(authenticate.verifyUser, (req, res, next) => {
    var err = new Error(req.method + " not supported!");
    err.status = 403; // method not supported
    next(err);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Leaders.findByIdAndUpdate(req.params.leaderID, {
        $set: req.body
    }, {
        new:true
    })
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader);
    })
    .catch(err => next(err))
})
// use :PARAMS_NAME to add params through endpoint
.delete(authenticate.verifyUser, (req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err) => next(err))
});

module.exports = leaderRouter;
