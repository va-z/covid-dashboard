import './Search.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Toggle from '../toggle/Toggle';

class Search extends FullscreenContainer {
  constructor() {
    super({ className: CLASSES.SEARCH.SEARCH });

    const title = Element.createDOM({
      tagName: TAGS.H2,
      className: CLASSES.SEARCH.SEARCH_TITLE,
      textContent: 'Cases by countries',
    });

    const searchInput = Element.createDOM({
      tagName: TAGS.INPUT,
      className: CLASSES.SEARCH.SEARCH_INPUT,
      attrs: [
        ['type', 'text'],
        ['placeholder', 'Search'],
      ],
    });

    const searchList = Element.createDOM({
      tagName: TAGS.UL,
      className: CLASSES.SEARCH.SEARCH_LIST,
    });

    const text = Element.createDOM({
      tagName: TAGS.SPAN,
      textContent: 'List-item here',
    });

    const togglesContainer = Element.createDOM({
      className: CLASSES.STATIC.TOGGLES_CONTAINER,
    });

    const togglePeriod = Toggle.createDOM({
      type: 'period',
      btnTitles: ['total', 'last day'],
    });

    const toggleAmount = Toggle.createDOM({
      type: 'amount',
      btnTitles: ['abs', 'per 100K'],
    });

    searchList.append(text);
    togglesContainer.append(togglePeriod, toggleAmount);

    this.element.append(title, searchInput, searchList, togglesContainer);
  }
}

export default Search;
