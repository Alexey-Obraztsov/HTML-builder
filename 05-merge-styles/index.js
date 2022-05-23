const fs = require('fs');
const path = require('path');

const error = (err) => {
  if (err) throw err;
};

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  const cssList = files.filter(value => path.extname(value) === '.css');
  let strOut = '';
  cssList.forEach(val => {
    fs.readFile(path.join(__dirname, 'styles', val), 'utf-8', (err, data) => {
      strOut += data;
      fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), strOut, error);
    });
  });
});