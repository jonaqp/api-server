const jwt = require('jwt-simple');

const { JWT } = require('../../config');

const encode = async ({ _id, username }) => {
  try {
    const token = await jwt.encode({
      _id,
      username,
      iat: new Date().getTime(),
    }, JWT);
    return token;
  } catch (error) {
    throw new Error(error);
  }
}

const decode = async (token) => {
  try {
    const user = await jwt.decode(token, JWT);
    return user;
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  encode,
  decode
};
