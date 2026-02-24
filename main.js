const fs = require('node:fs');
const afs = require('node:fs/promises')
const path = require('node:path');
const readLine = require('node:readline/promises');

const start = async () => {
    const myFilePath = path.join(process.cwd(), 'emails-2.txt');
    const gmailFilePath = path.join(process.cwd(), 'gmails.txt');

    const fileStream = fs.createReadStream(myFilePath,  'utf8');
    const rl = readLine.createInterface({input: fileStream});

    try{
        for await (const line of rl) {
            const email = line.split('\t').splice(-1)[0];
            const domainName = email.split('@').splice(-1)[0];
            if(domainName === 'gmail.com'){
                await afs.appendFile(gmailFilePath, `${email}\n`);
            }
        }
    } finally {
        await rl.close();
    }
}

start();