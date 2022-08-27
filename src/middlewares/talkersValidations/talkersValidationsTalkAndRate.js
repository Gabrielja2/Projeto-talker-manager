const talkersValidationsTalkAndRate = (req, res, next) => {
  const talkerToAdd = req.body;
  
  if (!talkerToAdd.talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  
  if (!talkerToAdd.talk.rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (talkerToAdd.talk.rate < 1 || talkerToAdd.talk.rate > 5) {
    console.log('oi', parseInt(talkerToAdd.talk.rate, 32));
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }  

next();
};

module.exports = {
 talkersValidationsTalkAndRate,
};