const talkersValidationsNameAndAge = (req, res, next) => {
  const talkerToAdd = req.body;
  if (!talkerToAdd.name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }   
  if (talkerToAdd.name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  if (!talkerToAdd.age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (talkerToAdd.age < 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }   
next();
};

module.exports = {
  talkersValidationsNameAndAge,
};