import './FooterAuthors.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';

class FooterAuthors extends Element {
  constructor() {
    super({ className: CLASSES.STATIC.FOOTER_AUTHORS, textContent: 'Created by:' });

    const author1 = Element.createDOM({
      tagName: TAGS.A,
      className: CLASSES.STATIC['FOOTER_AUTHORS-PERS'],
      textContent: 'Author#1',
      attrs: [['href', 'https://www.some-adress/change-me']],
    });

    const author2 = Element.createDOM({
      tagName: TAGS.A,
      className: CLASSES.STATIC['FOOTER_AUTHORS-PERS'],
      textContent: 'Author#2',
      attrs: [['href', 'https://www.some-adress/change-me']],
    });

    this.element.append(author1, author2);
  }
}

export default FooterAuthors;
