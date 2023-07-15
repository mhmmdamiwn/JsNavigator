const fs = require("fs");
const path = require("path");

const pkgPath = path.resolve("../../package.json");
const pkg = require(pkgPath);

console.log("path", pkgPath);
console.log("pkg", pkg);

if (!("scripts" in pkg)) {
	pkg.scripts = {};
}
pkg.scripts["js-nav"] = "(cd node_modules/js-navigator && npm run js-nav)";

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
