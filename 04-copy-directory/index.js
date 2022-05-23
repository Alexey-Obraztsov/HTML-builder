const fs = require('fs');
const path = require('path');

const error = (err) => {
  if (err) throw err;
};

const copyDir = () => {
  fs.rm(path.join(__dirname, 'files-copy'), {recursive: true, force: true}, () => {
    fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, error);
    fs.readdir(path.join(__dirname, 'files'), (err, arr) => {
      for(let i=0; i<arr.length; i++){
        fs.copyFile(path.join(__dirname, 'files', arr[i]), path.join(__dirname, 'files-copy', arr[i]), error);
      }
    });
  });
};

copyDir(); 
