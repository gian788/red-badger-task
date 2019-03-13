const readline = require('readline');
const getFinalPositions = require('./src/getRobotFinalPositions');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lines = [];
rl.on('line', line => lines.push(line));

rl.on('close', () => {
  const matrixSize = lines[0].split(' ').map(n => parseInt(n, 10));
  lines = lines.slice(1);
  const input = [];
  for (let i = 0; i < lines.length; i += 3) {
    const position = lines[i].split(' ');
    position[0] = parseInt(position[0], 10);
    position[1] = parseInt(position[1], 10);
    input.push({
      position,
      commands: lines[i + 1],
    });
  }
  console.log(getFinalPositions(matrixSize, input)); // eslint-disable-line no-console
});
