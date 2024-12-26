const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');
const templateHtml = path.join(__dirname, 'template.html');
const component = path.join(__dirname, 'components');
const styling = path.join(__dirname, 'styles');
const assetsPath = path.join(__dirname, 'assets');
const distAssets = path.join(projectDist, 'assets');

async function createHypertextMarkupLanguage() {
  let template = await fs.promises.readFile(templateHtml, 'utf-8');

  const tags = template.match(/{{\w+}}/g) || [];

  for (const tag of tags) {
    const name = tag.replace(/[{}]/g, '');
    const resultPath = path.join(component, `${name}.html`);

    if (fs.existsSync(resultPath)) {
      const componentContent = await fs.promises.readFile(resultPath, 'utf-8');

      template = template.replace(tag, componentContent);
    }
  }

  await fs.promises.writeFile(path.join(projectDist, 'index.html'), template, 'utf-8');
}

async function createCascadingStyleSheets() {
  const styles = await fs.promises.readdir(styling, { 
    withFileTypes: true 
  });

  const array = [];

  for (const file of styles) {
    const resultPath = path.join(styling, file.name);
  
    if (file.isFile() && path.extname(file.name) === '.css') {
      const content = await fs.promises.readFile(resultPath, 'utf-8');
    
      array.push(content);
    }
  }

  await fs.promises.writeFile(path.join(projectDist, 'style.css'), array.join('\n'), 'utf-8');
}

async function copyAssets(src, dest) {
  await fs.promises.mkdir(dest, { 
    recursive: true 
  });

  const items = await fs.promises.readdir(src, { withFileTypes: true });
  
  for (const item of items) {
    const srcLink = path.join(src, item.name);
    const resultPath = path.join(dest, item.name);

    item.isDirectory() ? await copyAssets(srcLink, resultPath) : await fs.promises.copyFile(srcLink, resultPath)
  }
}

async function buildPage() {
  try {
    await fs.promises.mkdir(projectDist, { recursive: true });
    await createHypertextMarkupLanguage();
    await createCascadingStyleSheets();
    await copyAssets(assetsPath, distAssets);
    console.log('Сборка прошла нормально!');
  } catch (error) {
    console.error('Возникла ошибка:', error);
  }
}

buildPage();