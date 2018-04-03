const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;
let server = http.createServer((req, res) => {
  console.log("handling request from " + req.url + " BY method of " + req.method);
  if(req.method == 'GET'){
    fileUrl = '/index.html'; // '/'is needed and it is default
    if(req.url != '/') fileUrl = req.url;

    filePath = path.resolve('./public' + fileUrl);
    // console.log(filePath+"\n******************");
    //result is a absolute path    /Users/dongxiaohuang/Documents/Web/nodejs-learning/nodeHTTP/public/index.html
    fileExt = path.extname(filePath);
    if(fileExt == '.html'){
      fs.exists(filePath, (exists) =>{
        if(!exists){
          res.statusCode = 404;
          res.setHeader('Content-Type', 'text/html');
          res.end('<html><head></head><body>ERROR: 404, NOT FOUND!' + filePath+ ' is not found </body></html>');
          return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
      });
    }else{
      res.statusCode = 404;
      res.setHeader('Content-Type','text/html');
      res.end('<html><head></head><body>ERROR: 404, NOT FOUND!' + fileExt+ ' is not supported, only html allowed </body></html>');
    }

  }else{
    res.statusCode = 404;
    res.setHeader('Content-Type',"text/html");
    res.end('<html><head></head><body>ERROR: 404!' + req.method+ ' is not supported </body></html>');
  }
});
// listen port and then hostname
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
