const express = require('express');
const bodyParser = require('body-parser');
const talkManager = require('./talkManager');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

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
  console.log(paramId);
  const talker = await talkManager.getTalkerById(paramId);
  console.log(talker);
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});
