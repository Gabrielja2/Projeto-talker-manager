const express = require('express');
const { validarLogin } = require('../middlewares/loginValidations');
const hash = require('../utils/token');

const loginRouter = express.Router();

loginRouter.use(validarLogin);

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.params;
  const token = hash.randonToken();
  if (!email && !password) {
    return res.status(200).json({ token });
  }
});

module.exports = loginRouter;