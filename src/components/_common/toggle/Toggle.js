import './Toggle.scss';
import { TAGS, CLASSES } from '../../../js/constants/index';
import Element from '../Element';

class Toggle extends Element {
  /**
   * @param {Object} params - an object with instance params
   * @param {String} params.type - string 'period' or 'amount' - toggle period or amount
   * @param {Array} params.btnTitles - an array of titles for buttons
   */
  constructor({
    type = null,
    btnTitles = null,
  } = {}) {
    super({ className: `${CLASSES.STATIC.TOGGLES} ${CLASSES.STATIC.TOGGLES}--${type}` });

    this.btnLeft = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: `${CLASSES.STATIC.TOGGLES_BTN} ${CLASSES.STATIC['TOGGLES_BTN-LEFT']} ${CLASSES.STATIC['TOGGLES_BTN-ACTIVE']}`,
      textContent: btnTitles[0],
      attrs: [['type', 'button']],
    });

    this.btnRight = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: `${CLASSES.STATIC.TOGGLES_BTN} ${CLASSES.STATIC['TOGGLES_BTN-RIGHT']}`,
      textContent: btnTitles[1],
      attrs: [['type', 'button']],
    });

    this.element.append(this.btnLeft, this.btnRight);
  }
}

export default Toggle;
