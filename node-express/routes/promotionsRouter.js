const express = require('express');
const bodyParser = require('body-parser');

let promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next(); // without next, the client will never get response form the following method
})
.get((req, res, next) => {
  res.end('will get info of promotions');
})
.post((req, res, next) => {
  res.end('will add the info of promotions ' + req.body.name + " with details of " + req.body.description);
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end(req.method + ' not supported!');
})
.delete((req, res, next) => {
  res.end('will delete all the info of promotions');
});

promotionRouter.route('/:promoId')
.get((req, res, next) => {
  res.end("will return the promotion of id :" + req.params.promoId + ' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403; // method not supported
  res.end(req.method + " not supported!");
})
.put((req, res, next) => {
  res.write('Updating the details for ID = '+ req.params.promoId +'\n');
  res.end("will update promotion :" + req.params.promoId + " with the details : " + req.body.description );
})
// use :PARAMS_NAME to add params through endpoint
.delete((req, res, next) => {
  res.end("will delete the promotion with ID = " + req.params.promoId);
});


module.exports = promotionRouter;
