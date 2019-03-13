const allowedOrientations = ['N', 'E', 'S', 'W'];

const changeOrientation = (orientation, direction) => {
  const i = allowedOrientations.indexOf(orientation);
  let newOrientationIndex = (i + (direction === 'R' ? 1 : -1)) % allowedOrientations.length;
  if (newOrientationIndex === -1) {
    newOrientationIndex = allowedOrientations.length - 1;
  }
  return allowedOrientations[newOrientationIndex];
};

const arePositionsEqual = (arr1, arr2) => (
  arr1[0] === arr2[0] &&
  arr1[1] === arr2[1] &&
  arr1[2] === arr2[2]
);

const isAllowed = (scents, pos) => !scents.find(scent => arePositionsEqual(scent, pos));

const getNewPosition = (pos) => {
  const orientation = pos[2];
  let newPos;
  switch (orientation) {
    case 'N':
      newPos = [pos[0], pos[1] + 1, pos[2]];
      break;
    case 'S':
      newPos = [pos[0], pos[1] - 1, pos[2]];
      break;
    case 'E':
      newPos = [pos[0] + 1, pos[1], pos[2]];
      break;
    case 'W':
      newPos = [pos[0] - 1, pos[1], pos[2]];
      break;
    default:
  }
  return newPos;
};

const doesDropOff = (matrixSize, pos) => {
  const newPos = getNewPosition(pos);
  return newPos[0] < 0 || newPos[0] > matrixSize[0] || newPos[1] < 0 || newPos[1] > matrixSize[1];
};

const getRobotFinalPosition = (matrixSize, scents, initialPosition, commands) => {
  let pos = [...initialPosition];
  let isLost = false;
  let i = 0;

  while (i < commands.length && !isLost) {
    const cmd = commands[i];
    switch (cmd) {
      case 'L':
      case 'R':
        pos = [pos[0], pos[1], changeOrientation(pos[2], cmd)];
        break;
      case 'F':
        if (isAllowed(scents, pos)) {
          if (doesDropOff(matrixSize, pos)) {
            // leave scent
            scents.push(pos);
            isLost = true;
          } else {
            // move
            pos = getNewPosition(pos);
          }
        } else {
          // blocked otherwise it drop off
        }
        break;
      default:
    }
    i += 1;
    if (isLost) {
      break;
    }
  }
  return isLost ? [...pos, 'LOST'] : pos;
};


module.exports = (matrixSize, input) => {
  if (
    !Array.isArray(matrixSize) ||
    matrixSize[0] < 1 || matrixSize[0] > 50 ||
    matrixSize[1] < 1 || matrixSize[1] > 50
  ) {
    throw new Error('Invalid "matrixSize" argument');
  }
  const scents = [];
  return input.map(el => getRobotFinalPosition(matrixSize, scents, el.position, el.commands));
};
