/**
 * Encrzption module
 */


var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq'; //TODO get the key form the Hardware. use the MAC details!!!!

exports.encrypt = function(input) {
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(input,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
};

exports.decrypt = function(input) {
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(input,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
};