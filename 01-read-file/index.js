const fs = require('fs');
const path = require('path');

const link = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(link, 'utf-8');

let data = '';

stream.on('data', chunk => data += chunk);
stream.on('end', () => console.log(data));
stream.on('error', err => console.log('Error: ', err.message));