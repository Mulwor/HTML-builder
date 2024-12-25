const fs = require('fs');                             
const path = require('path');               
const { stdout } = require('process');                   
            
const nameFile = 'text.txt';                                  

const pathText = path.join(__dirname, nameFile);
const textStream = fs.createReadStream(pathText);              

textStream.on('data', (data) => stdout.write(data));
