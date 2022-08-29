const { validationDate } = require('../../utils/dateValidation');

const talkersValidationsWatchedAt = (req, res, next) => {
  const talkerToAdd = req.body;
  const data = talkerToAdd.talk.watchedAt;
  if (!data) {
    res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  } else if (!validationDate(data)) {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } else {
    next();
  }
};

module.exports = {
 talkersValidationsWatchedAt,
};