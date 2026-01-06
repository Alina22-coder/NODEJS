// console.log('Hello from Node JS');
//
// console.log(__dirname);
// console.log(__filename);
// console.log(process.cwd());
//
// const {a, myFunc} = require('./services/test');
//
// console.log(a);
// myFunc();


//HTTP
const http = require('node:http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
})