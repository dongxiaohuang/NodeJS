const express = require('express');
const bodyParser = require('body-parser');
var authenticate = require('../authenticate');
let promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
let Promotions = require('../models/promotions');

promotionRouter.route('/')
.get((req, res, next) => {
  Promotions.find({})
  .then((promotions) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(promotions);
  }, (err) => next(err))
  .catch((err) =>  next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    Promotions.create(req.body)
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    }, (err) => (next(err)))
    .catch((err) => {next(err)});
})
.put(authenticate.verifyUser, (req, res, next) => {
    var err = new Error(req.method + ' not supported!');
    err.status = 403;
    next(err);
})
.delete(authenticate.verifyUser, (req, res, next) => {
    Promotions.remove({})
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => {next(err)});
});

promotionRouter.route('/:promoId')
.get((req, res, next) => {
  Promotions.findById(req.params.promoId)
  .then((promotion) => {
      if(promotion){
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(promotion);
      }else{
          var err = new Error('promotion ID ' + req.params.promoId + ' not found!');
          err.status = 404;
          return next(err);
      }
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
  var err = new Error(req.method + " not supported!");
  err.status = 403;
  return next(err);
})
.put(authenticate.verifyUser, (req, res, next) => {
    Promotions.findByIdAndUpdate(req.params.promoId,
    {$set : req.body},{
        new: true
    })
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    }, (err) => next(err))
    .catch((err) => next(err));
})
// use :PARAMS_NAME to add params through endpoint
.delete(authenticate.verifyUser, (req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = promotionRouter;
