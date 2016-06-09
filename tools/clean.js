'use strict';

const fs = require('fs');

const paths = [
  'dist'
];

// export function cleanDir(path) => {

// };

paths.forEach(path => {
  const deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
      fs.readdirSync(path).forEach(file => {
        const currentPath = `${path}/${file}`;

        // If folder - make recursive call
        if (fs.lstatSync(currentPath).isDirectory()) {
          deleteFolderRecursive(currentPath);
        } else {
          // Delete file
          try {
            fs.unlinkSync(currentPath);
            console.log(`Deleted ${currentPath}`);
          } catch (error) {
            console.error(`Error deleting ${currentPath}. ERROR: ${error}`);
          }
        }
      });

      fs.rmdirSync(path);
    }
  };

  deleteFolderRecursive(path);
});
