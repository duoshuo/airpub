/**
*
* md5加密
* @param {[string]} [string] [请求字符串]
*
**/

module.exports = function(string) {
  var crypto = require('crypto');
  var md5sum = crypto.createHash('md5');
  md5sum.update(string, 'utf8');
  return md5sum.digest('hex');
}
