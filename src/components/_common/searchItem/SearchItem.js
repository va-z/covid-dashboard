import './SearchItem.scss';
import { TAGS, CLASSES } from '../../../js/constants/index';
import Element from '../Element';

class SearchItem extends Element {
  constructor({
    flag, name, value, currentName,
  }) {
    super({
      tagName: TAGS.LI,
      className: CLASSES.SEARCH['SEARCH-ITEM'],
      attrs: [
        ['data-state-name', name],
      ],
    });
    this.name = name;

    if (name === currentName) {
      this.element.classList.add('search-item--active');
    }

    const titleElem = Element.createDOM({
      tagName: TAGS.H3,
      className: CLASSES.SEARCH['SEARCH-ITEM_TITLE'],
      textContent: name,
    });

    const valueElem = Element.createDOM({
      tagName: TAGS.H3,
      className: CLASSES.SEARCH['SEARCH-ITEM_VALUE'],
      textContent: value.toLocaleString('ru-RU') || '0',
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

    this.element.addEventListener('click', () => {
      SearchItem.sendUpdateRequest(this.element, 'name', this.name);
    });
  }
}

export default SearchItem;
