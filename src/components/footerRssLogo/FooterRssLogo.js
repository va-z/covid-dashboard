import './FooterRssLogo.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';

class FooterRssLogo extends Element {
  constructor() {
    super({
      tagName: TAGS.A,
      className: CLASSES.STATIC['FOOTER_RSS-LOGO'],
      attrs: [['href', 'https://rs.school/js/']],
    });

    const logo = Element.createDOM({
      textContent: 'RSS Logo in svg',
    });

    this.element.append(logo);
  }
}

export default FooterRssLogo;

