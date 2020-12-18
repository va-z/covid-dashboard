import './Footer.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FooterAuthors from './../footerAuthors/FooterAuthors';
import FooterRssLogo from './../footerRssLogo/FooterRssLogo';

class Footer extends Element {
  constructor() {
    super({ tagName: TAGS.FOOTER, className: CLASSES.STATIC.FOOTER });

    const wrapper = Element.createDOM({
      className: CLASSES.STATIC.CONTENT_WRAPPER,
    });

    this.footerAuthors = FooterAuthors.createDOM();
    this.footerRssLogo = FooterRssLogo.createDOM();

    wrapper.append(this.footerAuthors, this.footerRssLogo);
    this.element.append(wrapper);
  }
}

export default Footer;
