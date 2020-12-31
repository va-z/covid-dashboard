import { TAGS } from '../../js/constants/index';
import Element from './Element';

class Button extends Element {
  constructor({ className, textContent, attrs } = {}) {
    super({
      tagName: TAGS.BUTTON,
      className,
      textContent,
      attrs,
    });

    this.addClasses(className);
  }
}

export default Button;
