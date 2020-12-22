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

    const key = type === 'period' ? 'figure' : type;
    const values = {
      figure: {
        total: 'all',
        'last day': 'today',
        daily: 'today',
      },
      amount: {
        abs: 'abs',
        'per 100K': '100k',
      },
    };

    this.btnLeft = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: `${CLASSES.STATIC.TOGGLES_BTN} ${CLASSES.STATIC['TOGGLES_BTN-ACTIVE']}`,
      textContent: btnTitles[0],
      attrs: [
        ['data-state-key', key],
        ['data-state-value', values[key][btnTitles[0]]],
      ],
    });

    this.btnRight = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: `${CLASSES.STATIC.TOGGLES_BTN}`,
      textContent: btnTitles[1],
      attrs: [
        ['data-state-key', key],
        ['data-state-value', values[key][btnTitles[1]]],
      ],
    });

    this.buttons = [
      this.btnRight,
      this.btnLeft,
    ];

    this.element.append(this.btnLeft, this.btnRight);

    this.element.addEventListener('click', (event) => {
      const targetCond = event.target.classList.contains(CLASSES.STATIC.TOGGLES_BTN);
      const activeCond = event.target.classList.contains(CLASSES.STATIC['TOGGLES_BTN-ACTIVE']);

      if (targetCond && !activeCond) {
        const changedKey = event.target.dataset.stateKey;
        const changedValue = event.target.dataset.stateValue;

        Toggle.sendUpdateRequest(event.target, changedKey, changedValue);
      }
    });
  }

  update(state) {
    this.buttons.forEach((button) => {
      const btnKey = button.dataset.stateKey;
      const btnValue = button.dataset.stateValue;

      if (state[btnKey] === btnValue) {
        button.classList.add(CLASSES.STATIC['TOGGLES_BTN-ACTIVE']);
      } else {
        button.classList.remove(CLASSES.STATIC['TOGGLES_BTN-ACTIVE']);
      }
    });
  }
}

export default Toggle;
