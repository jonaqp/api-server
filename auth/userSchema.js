const { hashPassword, comparePassword } = require('./utils/bcrypt');

const UserSchema = {
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  activeTokens: [ String ]
};


// TODO: figure out how to merge pre / post hooks in schema builder
const UserHooks = (Schema) => {
  Schema.pre('save', async function handlePasswordHash(next) {
    try {
      const user = this;
      if (!user.isModified('password')) return next();
      user.password = await hashPassword(user.password);
      next();
    } catch (error) {
      next(error);
    }
  })
}

const UserMethods = (Schema) => {
  Schema.methods.checkPassword = async function checkpassword(password) {
    try {
      const match = await comparePassword(password, this.password);
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
