import './FullscreenButton.scss';
import { TAGS, CLASSES } from '../../../js/constants/index';
import Element from '../Element';

class FullscreenButton extends Element {
  constructor({ className: outerClasses } = {}) {
    super({
      tagName: TAGS.BUTTON,
      className: CLASSES.STATIC.FULLSCREEN_BTN,
    });
    this.addClasses(outerClasses);
  }
}

export default FullscreenButton;
