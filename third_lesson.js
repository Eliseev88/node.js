const fs = require('fs');
const { Transform } = require('stream');

const FILE_PATH = 'logs/access.log';

const readStream = new fs.ReadStream(FILE_PATH, {
    encoding: 'utf-8',
    end: 64000,
});

const writeStreamIP1 = fs.createWriteStream('logs/89.123.1.41_requests.log', {
    flag: 'a', 
    encoding: 'utf-8', 
})
const writeStreamIP2 = fs.createWriteStream('logs/34.48.240.111_requests.log', {
    flag: 'a', 
    encoding: 'utf-8', 
})

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const transformedChunk = chunk.toString();

        let arrIP1 = transformedChunk.match(/89.123.1.41(.+?)(\n|$)/gm)
        let arrIP2 = transformedChunk.match(/34.48.240.111(.+?)(\n|$)/gm)

        if (arrIP1) writeStreamIP1.write(arrIP1.toString())
        if (arrIP2) writeStreamIP2.write(arrIP2.toString())

        this.push(transformedChunk);
        
        callback(null, transformedChunk);
    }
 });

 readStream.pipe(transformStream)