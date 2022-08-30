const fs = require('fs').promises;
const { join } = require('path');

const path = '.././talker.json';

const readTalkManagerFile = async () => {
    try {
        const content = await fs.readFile(join(__dirname, path), 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.log('erro ao ler o arquivo: ', error.message);
        return null;
    }  
};

const getAllTalkers = async () => {
  const data = await readTalkManagerFile();
  return data;
};

const getTalkerByQuery = async (queryParam) => {
  const talkers = await getAllTalkers();

  const filterByQuery = talkers.filter((t) =>
    t.name.includes(queryParam));
  return filterByQuery;
};

const getTalkerById = async (id) => {
  const talkers = await readTalkManagerFile();
  const talkerSearch = talkers.find((talker) => talker.id === id);

  return talkerSearch;
};

const writeTalkerFile = async (file) => {
  await fs.writeFile(join(__dirname, path), JSON.stringify(file));
};

const editTalker = async (talker, id) => {
      try {
        const arrayTalkers = await getAllTalkers();
        let editedTalker;
        for (let i = 0; i < arrayTalkers.length; i += 1) {
          if (arrayTalkers[i].id === Number(id)) {            
            arrayTalkers[i].name = talker.name;
            arrayTalkers[i].age = talker.age;
            arrayTalkers[i].talk.watchedAt = talker.talk.watchedAt;
            arrayTalkers[i].talk.rate = talker.talk.rate;
            editedTalker = arrayTalkers[i];
          }
        }
        await writeTalkerFile(arrayTalkers);
        return editedTalker;
      } catch (error) {
          return null;
      }
  };

const deleteTalker = async (id) => {
  const talkers = await getAllTalkers();
  const talkersFiltered = talkers.filter((t) => t.id !== id);
  // console.log('talkers', talkers);
  // console.log('esse id', id);
  await writeTalkerFile(talkersFiltered);
};

module.exports = {
  getAllTalkers,
  getTalkerByQuery,
  getTalkerById,
  writeTalkerFile,
  editTalker,
  deleteTalker,
};