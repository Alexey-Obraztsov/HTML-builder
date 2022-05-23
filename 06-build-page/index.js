const fs = require('fs');
const path = require('path');
const pathTemplate = path.join(__dirname, 'template.html');
const pathComponents = path.join(__dirname, 'components');
const pathOut = path.join(__dirname, 'project-dist');
const pathStyle = path.join(__dirname, 'styles');
const pathCurrImg = path.join(path.join(__dirname, 'assets', 'img'));
const pathOutImg = path.join(__dirname, 'project-dist', 'assets', 'img');
const pathCurrFonts = path.join(path.join(__dirname, 'assets', 'fonts'));
const pathOutFonts = path.join(__dirname, 'project-dist', 'assets', 'fonts');
const pathCurrSvg = path.join(path.join(__dirname, 'assets', 'svg'));
const pathOutSvg = path.join(__dirname, 'project-dist', 'assets', 'svg');
const error = (err) => {
  if (err) throw err;
};

fs.mkdir(pathOut, () => {
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), () => {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), () => {
    });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), () => {
    });
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), () => {
    });
  });
});

fs.readFile(pathTemplate, 'utf-8', (err, data) => {
  let template = data;
  fs.readdir(pathComponents, (err, files) => {
    files.forEach((val, i) => {
      fs.readFile(path.join(pathComponents, val), 'utf-8', (err, data) => {
        template = template.replace(`{{${val.slice(0, val.lastIndexOf('.'))}}}`, data);
        if (i === files.length - 1) {
          setTimeout(()=>fs.writeFile(path.join(pathOut, 'template.html'), template, () => {
          }),100);
        }
      });
    });
  });
});
  
fs.readdir(pathStyle, (err, files) => {
  const cssFilesList = files.filter(value => path.extname(value) === '.css');
  let strOut = '';
  cssFilesList.forEach(val => {
    fs.readFile(path.join(pathStyle, val), 'utf-8', (err, data) => {
      strOut += data;
      fs.writeFile(path.join(pathOut, 'style.css'), strOut, error);
    });
  });
});
  
copyFile(pathCurrImg, pathOutImg);
copyFile(pathCurrFonts, pathOutFonts);
copyFile(pathCurrSvg, pathOutSvg);
  
function copyFile(pathCurr, pathOut) {
  fs.readdir(pathOut, (err, files) => {
    if (files) {
      files.forEach(value => {
        fs.unlink(path.join(pathOut, value), error);
      });
    }
  });
  
  fs.readdir(pathCurr, (err, files) => {
    files.forEach(value => {
      fs.readFile(path.join(pathCurr, value), (err, data) => {
        error;
        fs.mkdir(pathOut, {recursive: true}, () => {
          fs.writeFile(path.join(pathOut, value), data, error);
        });
      });
    });
  });
}
  