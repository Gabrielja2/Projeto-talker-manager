const talkersValidationToken = (req, res, next) => {
  const { authorization } = req.headers;
  // console.log('aki', authorization);
  
  if (!authorization || authorization === undefined) {
    res.status(401).json({ message: 'Token não encontrado' });
  } else if (authorization.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
  } else {
    next();
  }
};
module.exports = {
 talkersValidationToken,
};