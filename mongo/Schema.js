/**
 * Mongoose schema declaration file
 * 
 * Used to allow multiple components to add to Schema build object
 * 
 * !!!!! THIS DOES NOT CHECK FOR DUPLICATE VALUES IN IMPORTED SCHEMA, LAST IN LINE WINS !!!!!
 */

const authUser = require('../auth/userSchema');
const userSchema = require('../user/userSchema');

const GlobalSchema = {
  User: [
    authUser,
    userSchema
  ]
};

module.exports = GlobalSchema;
