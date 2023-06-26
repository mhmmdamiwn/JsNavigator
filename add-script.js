const fs = require('fs');
const path = require('path');

const pkgPath = path.resolve(`${process.cwd()}/package.json`);
const pkg = require(pkgPath);
console.log('path',pkgPath)
console.log('pkg',pkg)
pkg.scripts.nav = 'vite && node main.js';

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));