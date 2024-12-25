const fs = require('fs');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const outputFolder = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputFolder, 'bundle.css');

function mergeStyles() {
  const write = fs.createWriteStream(outputFile);

  fs.readdir(stylesFolder, { withFileTypes: true }, (_, files) => {
    files.map((file) => {
      const fileToPath = path.join(stylesFolder, file.name);
      
      if (path.extname(file.name) === '.css' && file.isFile() ) {
        const read = fs.createReadStream(fileToPath, 'utf-8');

        read.pipe(write, { end: false });
        read.on('error', (err) => console.error(`Error with read file: ${file.name}:`, err));
      }
    });
  });

  write.on('finish', () => console.log('Style added in bundle.css!'));
  write.on('error', (err) => console.error('Error with message:', err));
}

mergeStyles();
