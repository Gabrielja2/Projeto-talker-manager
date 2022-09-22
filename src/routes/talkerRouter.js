const express = require('express');
const talkManager = require('../utils/talkManager');
const { talkersValidationsNameAndAge } = require(
  '../middlewares/talkersValidations/talkersValidationsNameAndAge',
  );
const { talkAndRate } = require(
  '../middlewares/talkersValidations/talkersValidationsTalkAndRate',
  );
const { talkersValidationsWatchedAt } = require(
  '../middlewares/talkersValidations/talkersValidationsWatched',
  );
const { talkersValidationToken } = require(
  '../middlewares/talkersValidations/talkersValidationToken',
  );

const nameAndAge = talkersValidationsNameAndAge;
const watchedAt = talkersValidationsWatchedAt;
const hashToken = talkersValidationToken;
const talkerRouter = express.Router();

talkerRouter.get('/', async (req, res) => {
  const talkers = await talkManager.getAllTalkers();
  res.status(200).json(talkers);
});

talkerRouter.get('/search', hashToken, async (req, res) => {
  const { q } = req.query;
  const talkersByQuery = await talkManager.getTalkerByQuery(q);

  res.status(200).json(talkersByQuery);
});

talkerRouter.get('/:id', async (req, res) => {
  const paramId = Number(req.params.id);
  const talker = await talkManager.getTalkerById(paramId);

  if (talker) {
    res.status(200).json(talker);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

talkerRouter.use(hashToken); // token validation!

talkerRouter.delete('/:id', async (req, res) => {
  const paramId = Number(req.params.id);

  await talkManager.deleteTalker(paramId);
  
  return res.status(204).send();
});

talkerRouter.use(nameAndAge, talkAndRate, watchedAt); // others validations!

talkerRouter.post('/', async (req, res) => {
  const talkerToAdd = req.body;
  const talkers = await talkManager.getAllTalkers();
  const idLastTalker = talkers[talkers.length - 1];
  const talkersFileWithNewTalker = [...talkers, {
    ...talkerToAdd, id: idLastTalker.id + 1,
  }];
  await talkManager.writeTalkerFile(talkersFileWithNewTalker);
  return res.status(201).json({ ...talkerToAdd, id: idLastTalker.id + 1 });
});

talkerRouter.put('/:id',
  async (req, res) => {
  const paramId = req.params.id;
  const talkerToEdit = req.body;
  const talkerEdited = await talkManager.editTalker(talkerToEdit, paramId);

  res.status(200).json(talkerEdited);
});

module.exports = talkerRouter;