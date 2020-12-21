import './Tabs.scss';
import { TAGS, CLASSES } from '../../../js/constants/index';
import Element from '../Element';

class Tabs extends Element {
  constructor() {
    super({ className: CLASSES.STATIC.TABS_CONTAINER });

    this.btnCases = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: `${CLASSES.STATIC.TABS_BTN} ${CLASSES.STATIC['TABS_BTN-ACTIVE']}`,
      textContent: 'Cases',
    });

    this.btnDeaths = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: CLASSES.STATIC.TABS_BTN,
      textContent: 'Deaths',
    });

    this.btnRecovered = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: CLASSES.STATIC.TABS_BTN,
      textContent: 'Recovered',
    });

    this.element.append(this.btnCases, this.btnDeaths, this.btnRecovered);
  }
}

export default Tabs;
