var fs = require('fs');

function increaseMinorVersion() {
  var packageJson = this.touch('package.json').require();
  packageJson.version = packageJson.version.split('.').map(function(v, index) { return index===1 ? parseInt(v)+1 : (index===2 ? 0 : v); }).join('.');
  fs.writeFileSync(require.resolve('./package.json'), JSON.stringify(packageJson, null, 2), 'utf-8');
  return packageJson;
}

module.exports = function increaseMinorVersionFactoy() {
  return function() {
    return this.run(increaseMinorVersion)
    .then(function(info) {
      return this.run('gitcommit', {
        message: 'Minor release '+info.version
      });
    }.bind(this));
  }
}
