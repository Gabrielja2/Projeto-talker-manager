const randon = () => Math.random().toString(36).substring(2).slice(0, 8);

const randonToken = () => randon() + randon();

console.log(randon());
console.log(randonToken());

module.exports = {
  randonToken,
};