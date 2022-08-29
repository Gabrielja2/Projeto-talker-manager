const { validateEmail } = require('../utils/validationEmail');

// console.log(validateEmail('email@email.com'));
const validarLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } else if (validateEmail(email) === false) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } else if (password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } else {
    next();
  }
};

module.exports = {
  validarLogin,
};