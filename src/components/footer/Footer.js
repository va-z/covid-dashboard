import './Footer.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import logo from '../../assets/rs_school_logo.svg';

class Footer extends Element {
  constructor() {
    super({ tagName: TAGS.FOOTER, className: CLASSES.STATIC.FOOTER });

    const wrapper = Element.createDOM({
      className: CLASSES.STATIC.CONTENT_WRAPPER,
    });

    const authors = Element.createDOM({
      className: CLASSES.STATIC.FOOTER_AUTHORS,
      textContent: 'Created by: ',
    });

    const author1 = Element.createDOM({
      tagName: TAGS.A,
      className: CLASSES.STATIC['FOOTER_AUTHORS-PERS'],
      textContent: 'va-z',
      attrs: [
        ['href', 'https://github.com/va-z'],
        ['target', '_blank'],
      ],
    });

    const author2 = Element.createDOM({
      tagName: TAGS.A,
      className: CLASSES.STATIC['FOOTER_AUTHORS-PERS'],
      textContent: 'AnnaZAS',
      attrs: [
        ['href', 'https://github.com/ansivgit'],
        ['target', '_blank'],
      ],
    });

    const rssLogo = Element.createDOM({
      tagName: TAGS.A,
      className: CLASSES.STATIC['FOOTER_RSS-LOGO'],
      attrs: [
        ['href', 'https://rs.school/js/'],
        ['target', '_blank'],
      ],
    });

    const logoImg = Element.createDOM({
      tagName: TAGS.IMG,
      className: CLASSES.STATIC['RSS-LOGO_IMG'],
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
