var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname + ".html";
  var errorFile="./error404.html";
  console.log(q.pathname)
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      fs.readFile(errorFile, function(err, data) {
        if (err) {
          console.error(err);
          return res.end("Error loading error page");
        }
        return res.end(data);
      });
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      return res.end(data); // Added return statement
    }
  });
}).listen(8090);