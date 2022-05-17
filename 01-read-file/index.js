const fs = require('fs');                              // Для взаимодействия с файловой системой в NodeJs
const path = require('path');                          // Для корректного указания пути к файлу 
const { stdout  } = require('process');                 // console.log
            

const nameFile = 'text.txt';
// __dirname - абсолютный путь к директории, в которой находится наш файл
const pathText = path.join(__dirname, nameFile);
const textStream = fs.createReadStream(pathText);              // Создать новый **ReadStream** из файла **text.txt**. 
textStream.on('data', (data) => {                               // Направить поток чтения в стандартный поток вывода.  
  stdout.write(data);
});
