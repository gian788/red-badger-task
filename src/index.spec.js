const assert = require('assert');
const getFinalPositions = require('./index');

const matrixSize = [5, 3];
const input = [
  {
    position: [1, 1, 'E'],
    commands: 'RFRFRFRF',
  },
  {
    position: [3, 2, 'N'],
    commands: 'FRRFLLFFRRFLL',
  },
  {
    position: [0, 3, 'W'],
    commands: 'LLFFFLFLFL',
  },
];
const expectedOutput = [
  [1, 1, 'E'],
  [3, 3, 'N', 'LOST'],
  [2, 3, 'S'],
];

assert.equal(getFinalPositions(matrixSize, input), expectedOutput);
