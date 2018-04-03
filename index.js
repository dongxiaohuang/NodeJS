const express = require('express');
const http = require('http');
const morgan = require('morgan');

let hostname = 'localhost';
let port = 3000;
let app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public')); // __dirname is the root of the project
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
