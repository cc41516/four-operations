export default function () {
  const globalRange = {
    'add': [2, 20, 2, 20],
    'sub': [2, 20, 2, 20],
    'mul': [2, 9, 2, 9],
    'div': [2, 81, 2, 9],
  }
  return {
    globalRange,
    operation: 'add', // switch between 'add', 'sub', 'mul', 'div'
    addNum1: { min: globalRange.add[0], max: globalRange.add[1] }, // set initial value to global min/max
    addNum2: { min: globalRange.add[2], max: globalRange.add[3] },
    subNum1: { min: globalRange.sub[0], max: globalRange.sub[1] },
    subNum2: { min: globalRange.sub[2], max: globalRange.sub[3] },
    mulNum1: { min: globalRange.mul[0], max: globalRange.mul[1] },
    mulNum2: { min: globalRange.mul[2], max: globalRange.mul[3] },
    divNum1: { min: globalRange.div[0], max: globalRange.div[1] },
    divNum2: { min: globalRange.div[2], max: globalRange.div[3] },
  }
}
