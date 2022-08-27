const { validationDate } = require('../../utils/dateValidation');

const talkersValidationsWatchedAt = (req, res, next) => {
  const talkerToAdd = req.body;
  const data = talkerToAdd.talk.watchedAt;
  if (!data) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!validationDate(data)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } 

next();
};

module.exports = {
 talkersValidationsWatchedAt,
};