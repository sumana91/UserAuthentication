var defaults = {
	passwordSaltRounds : 12,
	bytesForHash : 32,
  salt: require('bcrypt-nodejs').genSaltSync(12)
};

module.exports = defaults;
