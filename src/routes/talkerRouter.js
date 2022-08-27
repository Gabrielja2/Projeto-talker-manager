// const express = require('express');
// const talkManager = require('../utils/talkManager');
// const { talkersValidationsNameAndAge } = require(
//   '../middlewares/talkersValidations/talkersValidationsNameAndAge',
//   );
// const { talkersValidationsTalkAndRate } = require(
//   '../middlewares/talkersValidations/talkersValidationsTalkAndRate',
//   );
// const { talkersValidationsWatchedAt } = require(
//   '../middlewares/talkersValidations/talkersValidationsWatched',
//   );
// const { talkersValidationToken } = require(
//   '../middlewares/talkersValidations/talkersValidationToken',
//   );

// const nameAndAge = talkersValidationsNameAndAge;
// const talkAndRate = talkersValidationsTalkAndRate;
// const watchedAt = talkersValidationsWatchedAt;
// const authorization = talkersValidationToken;

// const talkerRouter = express.Router();

// talkerRouter.get('/', async (req, res) => {
//   const talkers = await talkManager.getAllTalkers();
//    return res.status(200).json(talkers);
// });

// talkerRouter.get('/:id', async (req, res) => {
//   const paramId = Number(req.params.id);
//   // console.log(paramId);
//   const talker = await talkManager.getTalkerById(paramId);
//   // console.log(talker);
//   if (talker) {
//     return res.status(200).json(talker);
//   }
//   return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
// });
// talkerRouter.use(authorization);

// talkerRouter.use(
//   nameAndAge,
//   talkAndRate,
//   watchedAt,
// );

// talkerRouter.post('/',
//   nameAndAge,
//   talkAndRate,
//   watchedAt,
//   authorization, async (req, res) => {
//   const talkerToAdd = req.body;
//   const talkers = await talkManager.getAllTalkers();

//   // console.log('auth :', req.headers.authorization);
//   // console.log(talkersValidations());

//   const idLastTalker = talkers[talkers.length - 1];
//   // console.log(idLastTalker.id);

//   const talkersFileWithNewTalker = [...talkers, {
//     ...talkerToAdd, id: idLastTalker.id + 1,
//   }];
//   // console.log(talkersFileWithNewTalker);
//   await talkManager.writeTalkerFile(talkersFileWithNewTalker);
//   return res.status(201).json({ ...talkerToAdd, id: idLastTalker.id + 1 });
// });

// module.exports = talkerRouter;