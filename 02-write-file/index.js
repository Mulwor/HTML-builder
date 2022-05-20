// Для взаимодействия с файловой системой в NodeJs
const fs = require('fs');
// Для корректного указания пути к файлу 
const path = require('path');
process.stdin.setEncoding('utf8');

const newFile = 'text.txt';

const pathToFile = path.join(__dirname, newFile);
const logger = fs.createWriteStream(pathToFile, {
  flags: 'a',
});

console.log('Привет дорогой друг, тебе необходимо ввести текст:');

process.on('SIGINT', function () {
  console.log('Всё, друг, пора прощаться!');
  logger.end();
  process.exit();
});

process.stdin.on('data', function (key) {
  if (key.trim().toString() == 'exit') {
    console.log('Всё, друг, пора прощаться!');
    logger.end();
    process.exit();
  }
  logger.write(`${key.trim().toString()}\n`);
});

