const UserSchema = {
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  }
};

module.exports = { 
  Schema: UserSchema
}