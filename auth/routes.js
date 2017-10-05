const Router = require('../server').Router
const router = Router();

const { registerUser, loginUser, logoutUser } = require('./controllers');
const { authorizeRoute } = require('./services');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/restricted', authorizeRoute, (req, res) => res.send({ success: 'Yay!'}))

module.exports = router;