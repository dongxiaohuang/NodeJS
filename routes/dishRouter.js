const express = require('express');
const bodyParser = require('body-parser');

let dishRouter = express.Router();

dishRouter.use(bodyParser.json());

// to mount start from '/'
// and extract the route
dishRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next(); // to handle the endpoint using its specific method
})
.get((req, res, next) => {
  res.end("will return the dishes info");
})
.post((req, res, next) => {
  res.end("will create a new dish :" + req.body.name + " with the details : " + req.body.description );
})
.put((req, res, next) => {
  res.statusCode = 403; // method not supported
  res.end(req.method + " not supported!");
})
.delete((req, res, next) => {
  res.end("will delete all dishes info");
});

// another endpoint
dishRouter.route('/:dishID')
.get((req, res, next) => {
  res.end("will return the dish of id :" + req.params.dishID + ' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403; // method not supported
  res.end(req.method + " not supported!");
})
.put((req, res, next) => {
  res.write('Updating the details for ID = '+ req.params.dishID);
  res.end("will update dish :" + req.params.dishID + " with the details : " + req.body.description );
})
// use :PARAMS_NAME to add params through endpoint
.delete((req, res, next) => {
  res.end("will delete the dish with ID = " + req.params.dishID);
});

module.exports = dishRouter; // every new js file is a new node module
