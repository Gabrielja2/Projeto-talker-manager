// const express = require('express');
// const { validarLogin } = require('../middlewares/loginValidations');
// const hash = require('../utils/token');

// const loginRouter = express.Router();

// loginRouter.use(validarLogin);

// loginRouter.post('/', validarLogin, async (req, res) => {
//   const token = hash.randonToken();
//   return res.status(200).json({ token });
// });

// module.exports = loginRouter;