/**
 * Mongoose schema declaration file
 * 
 * Used to allow multiple components to add to Schema build object
 * 
 * !!!!! THIS DOES NOT CHECK FOR DUPLICATE VALUES IN IMPORTED SCHEMA, LAST IN LINE WINS !!!!!
 */

module.exports = {
  User: [
    // require('../auth').UserSchema
  ]
};


/**
* 

*** Sample Schema ***

const { hashPassword, comparePassword } = require('./bcrypt');

const UserSchema = {
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String
  }
};


// TODO: figure out how to merge pre / post hooks in schema builder
const UserHooks = (Schema) => {
  Schema.pre('save', async function handlePasswordHash(next) {
    try {
      const user = this;
      if (!user.isModified('passwordHash')) return next();
      user.passwordHash = await hashPassword(user.passwordHash);
      next();
    } catch (error) {
      next(error);
    }
  })
}

const UserMethods = (Schema) => {
  Schema.methods.checkPassword = async function checkpassword(password) {
    try {
      const match = await comparePassword(password, this.passwordHash);
      return match;
    } catch (error) {
      throw new Error(error);
    }
  }
  return Schema;
}

module.exports = {
  Schema: UserSchema,
  Hooks: UserHooks,
  Methods: UserMethods
};

*/