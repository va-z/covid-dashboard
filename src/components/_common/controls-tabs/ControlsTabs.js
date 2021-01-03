import './ControlsTabs.scss';
import { capitalizeFirstLetter } from '../../../js/helpers/index';
import { STRINGS, CLASSES } from '../../../js/constants/index';
import ControlsContainer from '../ControlsContainer';

const {
  STATUS: {
    CASES,
    DEATHS,
    RECOVERED,
  },

  DATA_STATE_ATTR: {
    STATUS,
  },
} = STRINGS;

const getTabsParams = (className) => ({
  className: `${CLASSES.TABS} ${className}__${CLASSES.TABS}`,
  buttonParams: [
    {
      className: CLASSES.TABS_TAB,
      textContent: capitalizeFirstLetter(CASES),
      attrs: [
        [STATUS, CASES],
      ],
    },
    {
      className: CLASSES.TABS_TAB,
      textContent: capitalizeFirstLetter(DEATHS),
      attrs: [
        [STATUS, DEATHS],
      ],
    },
    {
      className: CLASSES.TABS_TAB,
      textContent: capitalizeFirstLetter(RECOVERED),
      attrs: [
        [STATUS, RECOVERED],
      ],
    },
  ],
});

class ControlsTabs extends ControlsContainer {
  constructor({ hostClassName }) {
    super({ ...getTabsParams(hostClassName) });
  }
}

export default ControlsTabs;
