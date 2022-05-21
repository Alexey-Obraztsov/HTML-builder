const fs = require('fs');
const path = require('path');
const {stdin, stdout}=process;

const link = path.join(__dirname, 'text.txt');

const output = fs.createWriteStream(link);
stdout.write('Write something>\n');
const exit=()=>process.exit(stdout.write('Well done!'));
process.on('SIGINT',()=>exit());
stdin.on('data',a=>a.toString().slice(0,4)!='exit'?output.write(a):exit());

