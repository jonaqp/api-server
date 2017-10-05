const User = require('../mongo').User;
const { sendUserError } = require('../server/utils');
const { decodeToken } = require('../auth/services');
const { requireFields } = require('../common/validation');

module.exports = {
  updateUser: async (req, res) => {
    try {
      const token = req.get('Authorization');
      const { _id } = await decodeToken(token);
      const { firstName, lastName, email } = req.body;
      requireFields({ firstName, lastName, email });
      const updatedUser = await User.findByIdAndUpdate(_id, { firstName, lastName, email }).select('_id');
      res.json(updatedUser);
    } catch (error) {
      sendUserError(error, res);
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select('firstName lastName username email');
      res.json(users);
    } catch (error) {
      sendUserError(error, res)
    }
  }
}