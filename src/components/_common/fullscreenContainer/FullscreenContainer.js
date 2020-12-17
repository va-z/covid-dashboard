import './FullscreenContainer.scss';
// import { TAGS, CLASSES } from '../../../js/constants/index';
import Element from '../Element';
import FullscreenButton from '../fullscreenButton/FullscreenButton';

class FullscreenContainer extends Element {
  constructor({ className: outerClasses }) {
    super({ className: outerClasses });

    this.fullscreenButton = FullscreenButton.createDOM();

    this.element.append(this.fullscreenButton);
  }
}

export default FullscreenContainer;
