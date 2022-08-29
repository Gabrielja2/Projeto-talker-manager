const talkAndRate = (req, res, next) => {
  const talkerToAdd = req.body;  
  if (!talkerToAdd.talk) {
    console.log('primeiro');
    res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  } else if (talkerToAdd.talk.rate === undefined) {
    console.log('segundo', talkerToAdd.talk.rate);
    res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  } else if (talkerToAdd.talk.rate < 1 || talkerToAdd.talk.rate > 5) {
    console.log('oi', talkerToAdd.talk.rate);
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } else {
    next();
  }
};

module.exports = {
  talkAndRate,
};