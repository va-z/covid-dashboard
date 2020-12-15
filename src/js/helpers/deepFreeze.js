const ZERO = 0;

function deepFreeze(obj) {
  Object.freeze(obj);

  const vals = Object.values(obj);
  const valsLength = vals.length;
  const isObj = (val) => typeof val === 'object' && val !== null;

  for (let i = ZERO; i < valsLength; i += 1) {
    const val = vals[i];

    if (isObj(val)) {
      deepFreeze(val);
    }
  }
}

export default deepFreeze;
