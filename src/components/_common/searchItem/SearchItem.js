import './SearchItem.scss';
import { TAGS, CLASSES } from '../../../js/constants/index';
import Element from '../Element';

class SearchItem extends Element {
  constructor({ name, value, flag }) {
    super({ tagName: TAGS.LI, className: CLASSES.SEARCH['SEARCH-ITEM'] });

    const titleElem = Element.createDOM({
      tagName: TAGS.H3,
      className: CLASSES.SEARCH['SEARCH-ITEM_TITLE'],
      textContent: name,
    });

    const valueElem = Element.createDOM({
      tagName: TAGS.H3,
      className: CLASSES.SEARCH['SEARCH-ITEM_VALUE'],
      textContent: value,
    });

    let flagElem = Element.createDOM();

    if (flag) {
      flagElem = Element.createDOM({
        tagName: TAGS.IMG,
        className: CLASSES.SEARCH['SEARCH-ITEM_FLAG'],
        attrs: [
          ['alt', name],
          ['src', flag],
        ],
      });
    }

    this.element.append(flagElem, titleElem, valueElem);
  }
}

export default SearchItem;
