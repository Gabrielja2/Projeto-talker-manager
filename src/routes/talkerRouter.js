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
   return res.status(200).json(talkers);
});

talkerRouter.get('/:id', async (req, res) => {
  const paramId = Number(req.params.id);
  // console.log(paramId);
  const talker = await talkManager.getTalkerById(paramId);
  // console.log(talker);
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

talkerRouter.use(hashToken); // token validation!

talkerRouter.delete('/:id', hashToken, async (req, res) => {
  const paramId = Number(req.params.id);

  await talkManager.deleteTalker(paramId);
  
  return res.status(204).send();
});

talkerRouter.use(nameAndAge, talkAndRate, watchedAt); // others validations!

talkerRouter.post('/', async (req, res) => {
  const talkerToAdd = req.body;
  const talkers = await talkManager.getAllTalkers();

  // console.log('auth :', req.headers.authorization);
  // console.log(talkersValidations());

  const idLastTalker = talkers[talkers.length - 1];
  // console.log(idLastTalker.id);

  const talkersFileWithNewTalker = [...talkers, {
    ...talkerToAdd, id: idLastTalker.id + 1,
  }];
  // console.log(talkersFileWithNewTalker);
  await talkManager.writeTalkerFile(talkersFileWithNewTalker);
  return res.status(201).json({ ...talkerToAdd, id: idLastTalker.id + 1 });
});

talkerRouter.put('/:id', hashToken, nameAndAge, talkAndRate, watchedAt,
  async (req, res) => {
  const paramId = req.params.id;
  const talkerToEdit = req.body;
  console.log('aki1', talkerToEdit);

  const talkerEdited = await talkManager.editTalker(talkerToEdit, paramId);
  console.log('aki2', talkerEdited);
  res.status(200).json(talkerEdited);
});

module.exports = talkerRouter;