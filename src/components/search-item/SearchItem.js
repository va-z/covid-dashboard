import './SearchItem.scss';
import {
  TAGS,
  CLASSES,
  STRINGS,
  CONFIGS,
} from '../../js/constants/index';
import Element from '../_common/Element';

class SearchItem extends Element {
  constructor({
    flag,
    name,
    value,
    currentName,
  }) {
    super({
      tagName: TAGS.LI,
      className: CLASSES.SEARCH_ITEM,
      attrs: [
        [STRINGS.DATA_STATE_ATTR.NAME, name],
      ],
    });

    if (name === currentName) {
      this.element.classList.add(CLASSES.SEARCH_ITEM_ACTIVE);
    }

    this.titleElem = Element.createDOM({
      tagName: TAGS.H3,
      className: CLASSES.SEARCH_ITEM_TITLE,
      textContent: name,
    });

    this.valueElem = Element.createDOM({
      tagName: TAGS.H3,
      className: CLASSES.SEARCH_ITEM_VALUE,
      textContent: value.toLocaleString(CONFIGS.LOCALE) || '0',
    });

    this.flagElem = Element.createDOM({
      tagName: TAGS.IMG,
      className: CLASSES.SEARCH_ITEM_FLAG,
      attrs: [
        ['alt', name],
        ['src', flag],
        ['style', flag ? '' : 'display: none'],
      ],
    });

    this.element.append(
      this.flagElem,
      this.titleElem,
      this.valueElem,
    );
  }

  static updateDOM(
    htmlElement,
    {
      flag,
      name,
      value,
      currentName,
    },
  ) {
    const elem = htmlElement;
    const [flagElem, titleElem, valueElem] = elem.children;

    elem.dataset.name = name;
    flagElem.src = flag;
    flagElem.alt = name;
    flagElem.style = flag ? '' : 'display: none';
    titleElem.textContent = name;
    valueElem.textContent = value.toLocaleString(CONFIGS.LOCALE) || '0';

    SearchItem.setActiveDOM(elem, currentName);
  }

  static setActiveDOM(htmlElement, currentName) {
    if (htmlElement.dataset.name === currentName) {
      htmlElement.classList.add(CLASSES.SEARCH_ITEM_ACTIVE);
    } else {
      htmlElement.classList.remove(CLASSES.SEARCH_ITEM_ACTIVE);
    }
  }
}

export default SearchItem;
