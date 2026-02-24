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
// const http = require('node:http');
//
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'application/json'});
//
//     if(req.url === '/cars') {
//         switch (req.method){
//             case 'GET':
//                 return res.end(JSON.stringify({
//                     data: 'my cars'
//                 }));
//             case "POST":
//                 return res.end(JSON.stringify({
//                     data: 'create cars'
//                 }))
//         }
//     }
// })
//
// server.listen(5555);

//PATH
// const path = require('node:path');
//
// const filePath = path.join(process.cwd(), 'services', 'test.js');
// console.log(filePath);
// console.log(path.basename(filePath)); // остання частина шляху
// console.log(path.dirname(filePath)); //все окрім останньої частини шляху
// console.log(path.extname(filePath)); //розширення файлу
// console.log(path.parse(filePath)); //об'єкт про шлях
// console.log(path.normalize('home/cwwf\\\//\/project/2\/servise'));
// console.log(path.isAbsolute(filePath));

//readLine
// const readline = require('node:readline/promises');
//
// const start = async () => {
//     const rtInterface = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout
//     });
//
//     const name = await  rtInterface.question('What is your name? ');
//
//     console.log(`Hello, ${name}!`);
//
//     rtInterface.close();
// }
//
// start();

//fs
// const fs = require('node:fs/promises');
// const path = require('node:path');
//
// const start = async () => {
//     // await fs.mkdir(path.join('storage', 'asd'), {recursive: true});
//     const filePath = path.join('storage', 'asd', 'file.txt');
//     // await fs.writeFile(filePath, 'Hello\n');
//     // await fs.appendFile(filePath, 'Hello2\n');
//     const readFileMyFile = await fs.readFile(filePath, 'utf8');
//     console.log(readFileMyFile);
// }
//
// start();