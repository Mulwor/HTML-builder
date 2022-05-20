const fs = require('fs');
const path = require('path');
const pathsToFiles = path.join(__dirname, '/secret-folder');

fs.readdir(pathsToFiles, { withFileTypes: true }, (value, secret_folder) => {
  if (value) { 
      console.log(value);
  } else {
    secret_folder.forEach((file) => {
        if (!file.isDirectory()) {
        fs.stat(pathsToFiles + `/${file.name}`, (value, parametrs) => {
          if (value) {
            console.log(value);
          } else {
            console.log (
                path.basename(file.name, path.extname(file.name)) + ' -',
                path.extname(file.name) + ' - ',
                parametrs.size / 1000 + ' KB'
            );
          }
        })
        }
    })
  }
})