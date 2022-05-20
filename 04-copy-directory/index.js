const fs = require('fs');
const path = require('path');
const fullPathToText = path.join(__dirname, '/files');

function callback(value) {
  if (value) {
    console.log(value);
  }
}

fs.readdir(fullPathToText, { withFileTypes: false }, (value, files) => {
  // Метод fs.readdir() используется для асинхронного чтения содержимого данного каталога. Обратный вызов этого метода возвращает массив всех имен файлов в каталоге.  
  if (value) {
    console.log(value);
  } else {
    fs.access(__dirname + '/files-copy', (coppie) => {
    // Метод fs.access() используется для проверки прав доступа к данному файлу или каталогу. 
      if (coppie) {
        fs.mkdir(__dirname + '/files-copy', (coppie) => {
        // Метод fs.mkdir() в Node.js используется для асинхронного создания 
            if (coppie) {
                console.log(coppie);
            } else {
                files.forEach((file) => {
                fs.copyFile(
                    __dirname + `/files/${file}`,
                    __dirname + `/files-copy/${file}`,
                    callback
                );
                });
            }
            });
        } else {
        fs.readdir(__dirname + '/files-copy', { withFileTypes: false }, (value, filesCopies) => {
            if (value) throw value;
            for (const file of filesCopies) {
              fs.unlink(path.join(__dirname + '/files-copy', file), (value) => {
                if (value) throw value;
              });
            }
          }
        );
        setTimeout(() => {
          files.forEach((file) => {
            fs.copyFile(
              __dirname + `/files/${file}`,
              __dirname + `/files-copy/${file}`,
              callback
            );
          });
        });
      }
    });
  }
});
