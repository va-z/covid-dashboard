import './Tabs.scss';
import { TAGS, CLASSES } from '../../../js/constants/index';
import Element from '../Element';

class Tabs extends Element {
  /**
   * @param {Object} params - an object with instance params
   * @param {String} params.btnIndexes - an array of 'data-index' attr
   *                                     for for determining which button acting
   * @param {Array} params.btnTitles - an array of titles for buttons
   */
  constructor({
    btnIndexes = null,
    btnTitles = null,
  } = {}) {
    super({ className: CLASSES.STATIC.TABS_CONTAINER });

    this.btnTotal = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: `${CLASSES.STATIC.TABS_BTN} ${CLASSES.STATIC['TABS_BTN-ACTIVE']}`,
      textContent: btnTitles[0],
      attrs: [['data-index', btnIndexes[0]]],
    });

    this.btnRecovery = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: CLASSES.STATIC.TABS_BTN,
      textContent: btnTitles[1],
      attrs: [['data-index', btnIndexes[1]]],
    });

    this.btnDeaths = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: CLASSES.STATIC.TABS_BTN,
      textContent: btnTitles[2],
      attrs: [['data-index', btnIndexes[2]]],
    });

    this.element.append(this.btnTotal, this.btnRecovery, this.btnDeaths);
  }
}

export default Tabs;
