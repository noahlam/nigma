const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME_MAP = {
    html: 'text/html',
    css: 'text/css',
    js: 'text/javascript',
    json: 'application/json',
    txt: 'text/plain',
    xml: 'text/xml',

    ico: 'image/x-icon',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    gif: 'image/gif',
    png: 'image/png',
    svg: 'image/svg+xml',
};

const PORT = 8000;

const root = path.join(__dirname, '/');

const server = http.createServer(function(request, response) {
    let { url } = request;
    if(url === '/') url = '/index.html';

    const filePath = path.join(root, url);
    const ext = url.substr(url.lastIndexOf('.') + 1);

    fs.stat(filePath, function(err, stats) {
        if(!err && stats.isFile()) {
            const contentType = MIME_MAP[ext];
            response.writeHead(200, { 'Content-Type': contentType + ';charset=UTF-8' })
            fs.createReadStream(filePath).pipe(response);
        }
        else {
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
});

server.listen(PORT);
console.log(`http://127.0.0.1:${PORT}/`);
