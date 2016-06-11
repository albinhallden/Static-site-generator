const fs = require('fs');

const paths = [
  'dist'
];

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
            console.log(`Deleted ${currentPath}`); // eslint-disable-line
          } catch (error) {
            console.error(`Error deleting ${currentPath}. ERROR: ${error}`); // eslint-disable-line
          }
        }
      });

      fs.rmdirSync(path);
    }
  };

  deleteFolderRecursive(path);
});
