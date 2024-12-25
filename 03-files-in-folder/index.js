const fs = require('fs');
const path = require('path');

const pathsToFiles = path.join(__dirname, '/secret-folder');

fs.readdir(pathsToFiles, { withFileTypes: true }, (value, secret_folder) => {
  if (value) { 
    console.log(value);
  } else {
    secret_folder.forEach((file) => {
      if (!file.isDirectory()) {
        fs.stat(pathsToFiles + `/${file.name}`, (value, parameters) => {
          if (value) {
            console.log(value);
          } else {
            const name = path.basename(file.name, path.extname(file.name)) + ' -';
            const language = path.extname(file.name) + ' - ';
            const size = parameters.size / 1000 + ' KB'

            console.log(name, language, size)
          }
        })
      }
    })
  }
})