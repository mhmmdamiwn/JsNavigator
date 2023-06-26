const fs = require('fs');
const path = require('path');

const pkgPath = path.resolve(`${process.cwd()}/package.json`);
const pkg = require(pkgPath);

pkg.scripts.nav = 'vite && node main.js';

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));