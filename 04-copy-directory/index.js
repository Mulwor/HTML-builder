const fs = require('fs');
const path = require('path');
const fullPathToText = path.join(__dirname, '/files');

function callback(value) {
  if (value) {
    console.log(value);
  }
}

fs.readdir(fullPathToText, { withFileTypes: false }, (value, files) => {
  if (value) {
    console.log(value);
  } else {
    fs.access(__dirname + '/files-copy', (copy) => {
      if (copy) {
        fs.mkdir(__dirname + '/files-copy', (copy) => {
            if (copy) {
              console.log(copy);
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
