const User = require('../mongo').User;
const { encode, decode } = require('./utils/jwt');
const { sendUserError, throwError } = require('../server/utils');
const { requireFields } = require('../common/validation');


module.exports = {
  // TODO: add user registration logger
  registerUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      requireFields({ username, password });
      const user = await new User({ username, password });
      const token =  await encode({ _id: user._id, username });
      user.activeTokens.push(token);
      await user.save();
      res.json({ token })
    } catch (error) {
      sendUserError(error, res);
    }
  },

  // TODO: add user login logger
  loginUser: async (req, res) => {
    try { 
      const { username, password } = req.body;
      requireFields({ username, password });
      const user = await User.findOne({ username });
      if (!user) throwError('not a valid username / password combination');
      const passwordMatch = await user.checkPassword(password);
      if (!passwordMatch) throwError('not a valid username / password combination');
      const token = await encode({ _id: user._id, username });
      user.activeTokens.push(token);
      await user.save();
      res.json({ token });
    } catch (error) {
      sendUserError(error, res);
    }
  },

  // TODO: add user logout logger
  logoutUser: async (req, res) => {
    try {
      const token = req.get('Authorization');
      const { _id } = await decode(token);
      const user = await User.findById(_id);
      const tokenRemoved = user.activeTokens.filter(t => t !== token);
      user.activeTokens = tokenRemoved;
      await user.save();
      res.json({ success: 'User successfully logged out'});
    } catch (error) {
      sendUserError(error, res)
    }
  }
}