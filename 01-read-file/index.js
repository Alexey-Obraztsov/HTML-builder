const fs = require('fs');
const path = require('path');

const link = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(link, 'utf-8');

let data = '';

stream.on('data', chunk => console.log(data += chunk));