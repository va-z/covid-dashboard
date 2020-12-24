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
    const dateWrapper = Element.createDOM({ className: CLASSES.STATIC.HEADER_INFO });
    const text = Element.createDOM({ textContent: 'Last updated: ' });

    this.date = Element.createDOM({ tagName: TAGS.P });

    this.button = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: 'header__button',
      textContent: 'Save as JSON',
    });

    dateWrapper.append(text, this.date);
    wrapper.append(title, dateWrapper, this.button);
    this.element.append(wrapper);
  }

  update({ updateTimestamp }) {
    this.date.textContent = new Date(updateTimestamp).toUTCString();
  }
}

export default Header;
