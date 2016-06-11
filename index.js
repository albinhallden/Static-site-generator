import path from 'path';
import fs from 'fs';
import nunjucks from 'nunjucks';
import mkdirp from 'mkdirp';
import fm from 'front-matter';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

const nunjucksEnv = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(['./src/views/'])
);

const baseDir = path.join(process.cwd(), './src/views/pages/');
const distDir = path.join(process.cwd(), './dist/');

const writeFile = (relativePath) => {
  const absolutePath = path.join(baseDir, relativePath);
  const directory = relativePath.substring(0, relativePath.lastIndexOf('\\'));
  const fileName = relativePath.substring(relativePath.lastIndexOf('\\') + 1);

  const fmData = fm(fs.readFileSync(absolutePath, { encoding: 'utf8' }));
  const rendered = nunjucksEnv.render(absolutePath, fmData.attributes);

  const distPath = path.join(distDir, directory);
  mkdirp(distPath, (err) => {
    if (err) {
      console.log('Error creating:', directory); // eslint-disable-line
    } else {
      const filePath = path.join(distPath, fileName);
      fs.writeFileSync(filePath, rendered);
      console.log('Write', filePath); // eslint-disable-line
    }
  });
}

// Collect all views and render them
const getFileNames = (dir = '/') => {
  const directory = path.join(baseDir, dir);
  fs.readdirSync(directory).forEach(currentPath => {
    const absolutePath = path.join(directory, currentPath);
    const relativePath = path.join(dir, currentPath);
    if (fs.statSync(absolutePath).isDirectory()) {
      getFileNames(relativePath);
    } else {
      writeFile(relativePath);
    }
  });
}
getFileNames();

const compiler = webpack(webpackConfig);
compiler.run((err) => {
  if (err) {
    console.log('webpack error:', err); // eslint-disable-line
  } else {
    console.log('webpack build successful!'); // eslint-disable-line
  }
});
