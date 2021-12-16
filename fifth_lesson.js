const fs = require("fs");
const path = require("path");
const http = require('http');
const url = require('url');

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
}

http.createServer((request, response) => {
    if (request.method === 'GET') {
        const parsedURL = url.parse(request.url, true);
        const filePath = path.join('.', parsedURL.path);
        if (isFile(filePath)) {
            fs.readFile(filePath,'utf8', (err, data) => response.end(data))
        } else {
            fs.readdirSync(filePath).forEach(file => response.write(file + '\n')); 
            response.end();
        }
    } else {
        response.statusCode = 405;
        response.end('Method Not Allowed');
    }

}).listen(3000, 'localhost');
