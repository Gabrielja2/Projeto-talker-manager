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

const getTalkerById = async (id) => {
  const talkers = await readTalkManagerFile();
  const talkerSearch = talkers.find((talker) => talker.id === id);

  return talkerSearch;
};

module.exports = {
  getAllTalkers,
  getTalkerById,
};