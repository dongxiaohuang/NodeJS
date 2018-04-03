const express = require('express');
const bodyParser = require('body-parser');

let leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res, next) => {
  res.end('will get info of leaders');
})
.post((req, res, next) => {
  res.end('will add the info of leader ' + req.body.name + " with details of " + req.body.description);
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end(req.method + ' not supported!');
})
.delete((req, res, next) => {
  res.end('will delete all the info of leaders');
});


leaderRouter.route('/:leaderId')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res, next) => {
  res.end("will return the leader of id :" + req.params.leaderId + ' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403; // method not supported
  res.end(req.method + " not supported!");
})
.put((req, res, next) => {
  res.write('Updating the details for ID = '+ req.params.leaderId +'\n');
  res.end("will update leader :" + req.params.leaderId + " with the details : " + req.body.description );
})
// use :PARAMS_NAME to add params through endpoint
.delete((req, res, next) => {
  res.end("will delete the leader with ID = " + req.params.leaderId);
});

module.exports = leaderRouter;
