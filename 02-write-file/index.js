const fs = require('fs');
const path = require('path');

process.stdin.setEncoding('utf8');

const newFile = 'text.txt';

const pathToFile = path.join(__dirname, newFile);
const logger = fs.createWriteStream(pathToFile, { flags: 'a' });

console.log('Введите текст:');

process.on('SIGINT', function () {
  console.log('Всего доброго, написанный текст находится в text.txt');
  process.exit();
});

process.stdin.on('data', function (key) {
  if (key.trim().toString() == 'exit') {
    console.log('Всего доброго, написанный текст находится в text.txt');
    process.exit();
  }
  logger.write(`${key.trim().toString()}\n`);
});

