import './Footer.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';

class Footer extends Element {
  constructor() {
    super({ tagName: TAGS.FOOTER, className: CLASSES.FOOTER });

    const placeholder = Element.createDOM({
      tagName: TAGS.P,
      textContent: 'placeholder',
    });

    this.element.append(placeholder);
  }
}

export default Footer;
