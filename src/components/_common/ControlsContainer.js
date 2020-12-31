import { TAGS, CLASSES } from '../../js/constants/index';
import Element from './Element';
import Button from './Button';

class ControlsContainer extends Element {
  /**
   * @param {Object} params
   * @param {String} params.className
   * @param {Array.<Object>} params.buttonParams - an array of param Objects for new Button
   */
  constructor({ className, buttonParams = [] }) {
    super({ className });
    this.buttons = [];

    buttonParams.forEach((param, index) => {
      this[`button${index}`] = Button.createDOM(param);
      this.element.append(this[`button${index}`]);
      this.buttons.push(this[`button${index}`]);
    });

    this.element.addEventListener('click', (event) => {
      const closestButton = event.target.closest(TAGS.BUTTON);

      if (closestButton) {
        const containerCond = this.buttons.includes(closestButton);
        const activeCond = !closestButton.classList.contains('active');

        if (containerCond && activeCond) {
          const [attr, val] = Object.entries(closestButton.dataset)[0];

          ControlsContainer.fireEvent({
            dispatcher: closestButton,
            name: 'updateRequest',
            bubbles: true,
            detail: { change: [attr, val] },
          });
        }
      }
    });
  }

  update(state) {
    this.buttons.forEach((button) => {
      const [attr, val] = Object.entries(button.dataset)[0];

      if (state[attr] === val) {
        button.classList.add(CLASSES.ACTIVE);
      } else {
        button.classList.remove(CLASSES.ACTIVE);
      }
    });
  }
}

export default ControlsContainer;
