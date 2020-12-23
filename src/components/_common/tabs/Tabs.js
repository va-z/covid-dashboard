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
      attrs: [
        ['data-state-key', 'status'],
        ['data-state-value', 'cases'],
      ],
    });

    this.btnDeaths = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: CLASSES.STATIC.TABS_BTN,
      textContent: 'Deaths',
      attrs: [
        ['data-state-key', 'status'],
        ['data-state-value', 'deaths'],
      ],
    });

    this.btnRecovered = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: CLASSES.STATIC.TABS_BTN,
      textContent: 'Recovered',
      attrs: [
        ['data-state-key', 'status'],
        ['data-state-value', 'recovered'],
      ],
    });

    this.buttons = [
      this.btnCases,
      this.btnDeaths,
      this.btnRecovered,
    ];

    this.element.append(this.btnCases, this.btnDeaths, this.btnRecovered);

    this.element.addEventListener('click', (event) => {
      const targetCond = event.target.classList.contains(CLASSES.STATIC.TABS_BTN);
      const activeCond = event.target.classList.contains(CLASSES.STATIC['TABS_BTN-ACTIVE']);

      if (targetCond && !activeCond) {
        const changedKey = event.target.dataset.stateKey;
        const changedValue = event.target.dataset.stateValue;

        Tabs.sendUpdateRequest(event.target, changedKey, changedValue);
      }
    });
  }

  update(state) {
    this.buttons.forEach((button) => {
      const btnKey = button.dataset.stateKey;
      const btnValue = button.dataset.stateValue;

      if (state[btnKey] === btnValue) {
        button.classList.add(CLASSES.STATIC['TABS_BTN-ACTIVE']);
      } else {
        button.classList.remove(CLASSES.STATIC['TABS_BTN-ACTIVE']);
      }
    });
  }
}

export default Tabs;
