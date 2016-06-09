import path from 'path';
import fs from 'fs';
import nunjucks from 'nunjucks';
import mkdirp from 'mkdirp';

const baseDir = path.join(process.cwd(), './src/views/pages/');
const distDir = path.join(process.cwd(), './dist/');

// Collect all views and render them
const getFileNames = (dir = '/') => {
  let filePaths = [];
  const directory = path.join(baseDir, dir);
  fs.readdirSync(directory).forEach(currentPath => {
    const absolutePath = path.join(directory, currentPath);
    const relativePath = path.join(dir, currentPath);
    if (fs.statSync(absolutePath).isDirectory()) {
      filePaths = filePaths.concat(getFileNames(relativePath));
    } else {
      filePaths.push(relativePath);
    }
  });
  return filePaths;
}

getFileNames().forEach(templatePath => {
  const absolutePath = path.join(baseDir, templatePath);
  const directory = templatePath.substring(0, templatePath.lastIndexOf('\\'));
  const fileName = templatePath.substring(templatePath.lastIndexOf('\\') + 1);
  const rendered = nunjucks.render(absolutePath);

  const distPath = path.join(distDir, directory);
  mkdirp(distPath, (err) => {
    if (err) {
      console.log('error creating:', directory); // eslint-disable-line
    } else {
      fs.writeFileSync(path.join(distPath, fileName), rendered);
      console.log('write file', directory); // eslint-disable-line
    }
  });
});
