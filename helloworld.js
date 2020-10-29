const http = require('http');
const fs = require('fs');
const path = require('path');

function serveStaticFiles(res, requestPath, contentType, responseCode = 200) {
  fs.readFile(path.join(__dirname, requestPath), ((err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('500 - Internal Error');
    }
    res.writeHead(responseCode, { 'Content-Type': contentType });
    return res.end(data);
  }));
}

const port = process.env.PORT || 3e3;
const server = http.createServer(((req, res) => {
  const requestPath = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
  switch (requestPath) {
    case '':
      serveStaticFiles(res, '/public/home.html', 'text/html');
      break;
    case '/about':
      serveStaticFiles(res, '/public/about.html', 'text/html');
      break;
    case '/assets/img/logo.png':
      serveStaticFiles(res, '/public/assets/img/logo.png', 'image/png');
      break;
    default:
      serveStaticFiles(res, '/public/404.html', 'text/html', 404);
      break;
  }
}));

server.listen(port, () => console.info(`Server started on port ${port}`));
