const http = require('http');
const hostname = 'localhost';
const port = 3000;
let server = http.createServer((req, res) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type',"text/html");
  res.end('<html><head><title>Server</title></head><body>Hello World</body></html>');
});
// listen port and then hostname
server.listen(port, hostname, () => {
  console.log(`server is running at http://${hostname}:${port}`);
});
