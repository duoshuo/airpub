var _ = require('underscore'),
    mails = require('mails'),
    configs = require('../configs/mail.json');

module.exports = function(tpl, params, callback) {
    mails.send(tpl, _.extend(configs, params), callback);
}