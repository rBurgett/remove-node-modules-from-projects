const fs = require('fs-extra');
const path = require('path');
const rmrf = require('rmrf-promise');

(async function() {
  try {
    const parentDir = path.resolve(__dirname, '..');
    const contents = await fs.readdir(parentDir);
    for(item of contents) {
      const fullPath = path.join(parentDir, item);
      if(fullPath === __dirname) continue;
      const stats = await fs.stat(fullPath);
      if(!stats.isDirectory(fullPath)) continue;
      const nodeModulesPath = path.join(fullPath, 'node_modules');
      const exists = await fs.pathExists(nodeModulesPath);
      if(exists) {
        console.log(`Removing ${nodeModulesPath}`);
        await rmrf(nodeModulesPath);
      }
    }
  } catch(err) {
    console.log(err);
  }
})();
