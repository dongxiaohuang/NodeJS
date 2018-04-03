const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

let hostname = 'localhost';
let port = 3000;
let app = express();
app.use(morgan('dev')); // middleware / dev version
app.use(express.static(__dirname + '/public')); // __dirname is the root of the project, don't forget '/'
app.use(bodyParser.json()) // use this middleware to parse the json data inside requst body

// run at the beginning to handling all methods of requests
app.all('/dishes', (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next(); // to handle the endpoint using its specific method
});

app.get('/dishes', (req, res, next) => {
  res.end("will return the dishes info");
});
app.post('/dishes', (req, res, next) => {
  res.end("will create a new dish :" + req.body.name + " with the details : " + req.body.description );
});
app.put('/dishes', (req, res, next) => {
  res.statusCode = 403; // method not supported
  res.end(req.method + " not supported!");
});
app.delete('/dishes', (req, res, next) => {
  res.end("will delete all dishes info");
});
// another endpoint

app.get('/dishes/:dishID', (req, res, next) => {
  res.end("will return the dish of id :" + req.params.dishID + ' to you!');
});
app.post('/dishes/:dishID', (req, res, next) => {
  res.statusCode = 403; // method not supported
  res.end(req.method + " not supported!");
});
app.put('/dishes/:dishID', (req, res, next) => {
  res.write('Updating the details for ID = '+ req.params.dishID);
  res.end("will update dish :" + req.params.dishID + " with the details : " + req.body.description );
});
// use :PARAMS_NAME to add params through endpoint
app.delete('/dishes/:dishID', (req, res, next) => {
  res.end("will delete the dish with ID = " + req.params.dishID);
});



app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader("Content-Type", 'text/html');
  res.end('<html><head><body><h1>This is an express server</h1></body></head></html>');
});

let server = http.createServer(app);

server.listen(port, hostname, () =>
{
  console.log(`Server running at http://${hostname}:${port}`);
});
