const talkersValidationsNameAndAge = (req, res, next) => {
  const talkerToAdd = req.body;
  if (!talkerToAdd.name) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } else if (talkerToAdd.name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } else if (!talkerToAdd.age) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } else if (talkerToAdd.age < 18) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  } else {
    next();
  }  
};

module.exports = {
  talkersValidationsNameAndAge,
};