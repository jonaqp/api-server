const Router = require('../server').Router;

const router = Router();

const { updateUser, getAllUsers } = require('./controllers');

router.post('/update', updateUser);
router.get('/get-all', getAllUsers);

module.exports = router;