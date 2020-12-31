import './ControlsTabs.scss';
import { cap } from '../../../js/helpers/index';
import { STRINGS, CLASSES } from '../../../js/constants/index';
import ControlsContainer from '../ControlsContainer';

const {
  STATUS: { CASES, DEATHS, RECOVERED },
  DATA_STATE_ATTR: { STATUS },
} = STRINGS;

const getTabsParams = (className) => ({
  className: `${CLASSES.TABS} ${className}__${CLASSES.TABS}`,
  buttonParams: [
    {
      className: CLASSES.TABS__TAB,
      textContent: cap(CASES),
      attrs: [
        [STATUS, CASES],
      ],
    },
    {
      className: CLASSES.TABS__TAB,
      textContent: cap(DEATHS),
      attrs: [
        [STATUS, DEATHS],
      ],
    },
    {
      className: CLASSES.TABS__TAB,
      textContent: cap(RECOVERED),
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
