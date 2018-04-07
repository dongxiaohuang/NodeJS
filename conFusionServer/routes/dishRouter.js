const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Dishes = require('../models/dishes');

let dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// to mount start from '/'
// and extract the route
dishRouter.route('/')
.get((req, res, next) => {
  Dishes.find({})
  .then((dishes) => {
      res.StatusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(dishes);
  }, (err) => {next(err)})
  // .exec() //  we don't need exec because it only handle this, we don't need recall to the next
  // so we dont need to return as well
  .catch((err) => {next(err)})
})
.post((req, res, next) => {
    Dishes.create(req.body)
    .then((dishes) => {
        res.statusCode =200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dishes);
    }, (err) => {next(err)})
    .catch((err) => {next(err)});
})
.put((req, res, next) => {
  res.statusCode = 403; // method not supported
  res.setHeader('Content-Type', 'text/html');
  res.end(req.method + " not supported!");
})
.delete((req, res, next) => {
  Dishes.remove({})
  .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
 .catch((err) =>{console.log(err)});
});

// another endpoint
dishRouter.route('/:dishID')
.get((req, res, next) => {
    Dishes.findById(req.params.dishID)
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403; // method not supported
  res.end(req.method + " not supported!");
})
.put((req, res, next) => {
    Dishes.findByIdAndUpdate(req.params.dishID, {
        $set: req.body
    }, { new: true})
    .then((dish) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }, (err) => next(err))
    .catch((err)=> next(err));
})
// use :PARAMS_NAME to add params through endpoint
.delete((req, res, next) => {
    Dishes.findByIdAndRemove(req.params.dishID)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => {console.log(err)});
});

module.exports = dishRouter; // every new js file is a new node module
