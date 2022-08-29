const express = require('express');
const bodyParser = require('body-parser');
const talkManager = require('./utils/talkManager');
const hash = require('./utils/token');
const { validarLogin } = require('./middlewares/loginValidations');
const { talkersValidationsNameAndAge } = require(
  './middlewares/talkersValidations/talkersValidationsNameAndAge',
  );
const { talkAndRate } = require(
  './middlewares/talkersValidations/talkersValidationsTalkAndRate',
  );
const { talkersValidationsWatchedAt } = require(
  './middlewares/talkersValidations/talkersValidationsWatched',
  );
const { talkersValidationToken } = require(
  './middlewares/talkersValidations/talkersValidationToken',
  );

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const nameAndAge = talkersValidationsNameAndAge;
const watchedAt = talkersValidationsWatchedAt;
const hashToken = talkersValidationToken;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talkers = await talkManager.getAllTalkers();
   return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const paramId = Number(req.params.id);
  // console.log(paramId);
  const talker = await talkManager.getTalkerById(paramId);
  // console.log(talker);
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', validarLogin, async (req, res) => {
  const { email, password } = req.params;
  const token = hash.randonToken();  

  if (!email && !password) {
    return res.status(200).json({ token });
  }
});

app.post('/talker', hashToken, nameAndAge, talkAndRate, watchedAt, async (req, res) => {
  const talkerToAdd = req.body;
  const talkers = await talkManager.getAllTalkers();
  // console.log('nametoadd :', req.headers);
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

app.put('/talker/:id', hashToken, hashToken, nameAndAge, talkAndRate, watchedAt,
  async (req, res) => {
  const paramId = req.params.id;
  const talkerToEdit = req.body;
  console.log('aki1', talkerToEdit);

  const talkerEdited = await talkManager.editTalker(talkerToEdit, paramId);
  console.log('aki2', talkerEdited);
  res.status(200).json(talkerEdited);
});

app.delete('/talker/:id', hashToken, async (req, res) => {
  const paramId = Number(req.params.id);

  await talkManager.deleteTalker(paramId);
  
  return res.status(204).send();
});
