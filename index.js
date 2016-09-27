var fs = require('fs');

function increaseMinorVersion() {
  var package = this.touch('package.json');
  var json = package.require();
  json.version = json.version.split('.').map(function(v, index) { return index===1 ? parseInt(v)+1 : (index===2 ? 0 : v); }).join('.');
  package.write(JSON.stringify(json, null, 2));
  return json;
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
