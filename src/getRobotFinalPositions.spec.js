const { expect } = require('chai');
const getFinalPositions = require('./getRobotFinalPositions');

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

describe('getRobotFinalPositions', () => {
  it('should retunrn the final positions of the robots', () => {
    expect(getFinalPositions(matrixSize, input)).to.be.deep.equal(expectedOutput);
  });
});
