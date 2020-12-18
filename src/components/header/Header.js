import './Header.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';

class Header extends Element {
  constructor() {
    super({ tagName: TAGS.HEADER, className: CLASSES.STATIC.HEADER });

    const wrapper = Element.createDOM({
      className: CLASSES.STATIC.CONTENT_WRAPPER,
    });

    const title = Element.createDOM({
      tagName: TAGS.H1,
      className: CLASSES.STATIC.HEADER_TITLE,
      textContent: 'RSS COVID-19 Dashboard',
    });

    const dateWrapper = Element.createDOM({
      className: CLASSES.STATIC.HEADER_INFO,
    });

    const text = Element.createDOM({
      textContent: 'Last updated:',
    });

    this.date = new Element({
      tagName: TAGS.P,
      textContent: '00.00.2020',
    });

    dateWrapper.append(text, this.date.element);
    wrapper.append(title, dateWrapper);
    this.element.append(wrapper);
  }
}

export default Header;
