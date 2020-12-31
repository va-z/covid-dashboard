import './Footer.scss';
import { TAGS, CLASSES, CONFIGS } from '../../js/constants/index';
import Element from '../_common/Element';
import logo from '../../assets/rs_school_logo.svg';

class Footer extends Element {
  constructor({ blockClassName }) {
    super({ tagName: TAGS.FOOTER, className: CLASSES.FOOTER });
    this.addClasses(blockClassName);

    const wrapper = Element.createDOM({ className: CLASSES.FOOTER__WRAPPER });
    const authors = Element.createDOM({ textContent: 'Created by: ' });
    const author1 = Element.createDOM({
      tagName: TAGS.A,
      className: CLASSES.FOOTER__LINK,
      textContent: 'va-z',
      attrs: [
        ['href', CONFIGS.AUTHOR_1],
        ['target', '_blank'],
      ],
    });
    const author2 = Element.createDOM({
      tagName: TAGS.A,
      className: CLASSES.FOOTER__LINK,
      textContent: 'AnnaZAS',
      attrs: [
        ['href', CONFIGS.AUTHOR_2],
        ['target', '_blank'],
      ],
    });
    const rssLogo = Element.createDOM({
      tagName: TAGS.A,
      className: CLASSES['FOOTER__LINK--LOGO'],
      attrs: [
        ['href', CONFIGS.RSS],
        ['target', '_blank'],
      ],
    });
    const logoImg = Element.createDOM({
      tagName: TAGS.IMG,
      className: CLASSES.FOOTER__IMAGE,
      attrs: [
        ['src', logo],
        ['alt', 'RSS-logo'],
      ],
    });

    authors.append(author1, ' and ', author2, ' in 2020');
    rssLogo.append(logoImg);
    wrapper.append(authors, rssLogo);
    this.element.append(wrapper);
  }
}

export default Footer;
