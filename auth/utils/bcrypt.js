const bcrypt = require('bcrypt');

const { AUTHCOST } = require('../../config');

const hashPassword = async password => bcrypt.hash(password, AUTHCOST);

const comparePassword = async (password, hash) => bcrypt.compare(password, hash)

module.exports = { hashPassword, comparePassword };
