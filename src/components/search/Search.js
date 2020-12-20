import './Search.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Toggle from '../_common/toggle/Toggle';
import Tabs from '../_common/tabs/Tabs';

class Search extends FullscreenContainer {
  constructor() {
    super({ className: CLASSES.SEARCH.SEARCH });

    const title = Element.createDOM({
      tagName: TAGS.H2,
      className: CLASSES.SEARCH.SEARCH_TITLE,
      textContent: 'Cases by countries',
    });

    this.searchInput = Element.createDOM({
      tagName: TAGS.INPUT,
      className: CLASSES.SEARCH.SEARCH_INPUT,
      attrs: [
        ['type', 'text'],
        ['placeholder', 'Search'],
      ],
    });

    this.searchList = Element.createDOM({
      tagName: TAGS.UL,
      className: CLASSES.SEARCH.SEARCH_LIST,
    });

    const text = Element.createDOM({
      tagName: TAGS.SPAN,
      textContent: 'List-item here',
    });

    this.togglesContainer = Element.createDOM({
      className: CLASSES.STATIC.TOGGLES_CONTAINER,
    });

    this.togglePeriod = Toggle.createDOM({
      type: 'period',
      btnTitles: ['total', 'last day'],
    });

    this.toggleAmount = Toggle.createDOM({
      type: 'amount',
      btnTitles: ['abs', 'per 100K'],
    });

    this.tabs = Tabs.createDOM({
      btnIndexes: ['total', 'recovery', 'deaths'],
      btnTitles: ['Total', 'Recovery', 'Deaths'],
    });

    this.searchList.append(text);
    this.togglesContainer.append(this.togglePeriod, this.toggleAmount);

    this.element.append(title, this.searchInput, this.searchList, this.togglesContainer, this.tabs);
  }
}

export default Search;
