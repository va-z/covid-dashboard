import './FullscreenContainer.scss';
import { TAGS, CLASSES } from '../../../js/constants/index';
import Element from '../Element';

class FullscreenContainer extends Element {
  constructor() {
    super({ className: CLASSES.STATIC.FULLSCREEN });

    this.fullscreenButton = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: CLASSES.STATIC.FULLSCREEN_BTN,
    });

    this.element.append(this.fullscreenButton);

    this.fullscreenButton.addEventListener('click', () => {
      this.element.classList.toggle(CLASSES.STATIC.FULLSCREEN_ACTIVE);

      const event = new CustomEvent('fullscreenSet', {
        bubbles: true,
      });

      this.fullscreenButton.dispatchEvent(event);
    });
  }
}

export default FullscreenContainer;
