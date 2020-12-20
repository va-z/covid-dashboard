import deepFreeze from '../helpers/deepFreeze';

const STRINGS = {
  KEY: 'vazSavedState',

  TYPES: {
    CASES: 'cases',
    DEATHS: 'deaths',
    RECOVERED: 'recovered',
  },
};

deepFreeze(STRINGS);

export default STRINGS;
