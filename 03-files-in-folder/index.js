const path = require('path');
const fs = require('fs');


fs.readdir(path.join(__dirname, 'secret-folder'), (err, file) => {
  for (let i=0; i<file.length; i++) {
    fs.stat(path.join(__dirname, 'secret-folder', file[i]), (err, list) => {
      if (!list.isDirectory()) {
        const name = path.basename(file[i], path.extname(file[i]));
        const ext = path.extname(file[i]).slice(1);
        const size = list.size / 1000;
        console.log( `${name} - ${ext} - ${size}Kb`);
      }
    });
  }
});
