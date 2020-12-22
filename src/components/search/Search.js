import './Search.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import SearchItem from '../_common/searchItem/SearchItem';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Toggle from '../_common/toggle/Toggle';
import Tabs from '../_common/tabs/Tabs';

class Search extends FullscreenContainer {
  constructor() {
    super();
    this.addClasses(CLASSES.SEARCH.SEARCH);

    const title = Element.createDOM({
      tagName: TAGS.H2,
      className: CLASSES.SEARCH.SEARCH_TITLE,
      textContent: 'Cases by countries',
    });
    const togglesContainer = Element.createDOM({
      className: CLASSES.STATIC.TOGGLES_CONTAINER,
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

    this.togglePeriod = new Toggle({
      type: 'period',
      btnTitles: ['total', 'last day'],
    });

    this.toggleAmount = new Toggle({
      type: 'amount',
      btnTitles: ['abs', 'per 100K'],
    });

    this.tabs = new Tabs();

    this.controls = [
      this.togglePeriod,
      this.toggleAmount,
      this.tabs,
    ];

    togglesContainer.append(
      this.togglePeriod.element,
      this.toggleAmount.element,
    );

    this.element.append(
      title,
      this.searchInput,
      this.searchList,
      togglesContainer,
      this.tabs.element,
    );
  }

  update({ data, state, change }) {
    if (change) {
      this.controls.forEach((control) => {
        control.update(state);
      });
    }

    this.searchList.innerHTML = '';

    const key = state.getKey();

    const filteredData = data.map((obj) => ({
      flag: obj.flag,
      name: obj.name,
      value: obj[key],
    })).sort(({ value: val1 }, { value: val2 }) => val2 - val1);

    filteredData.forEach((obj) => {
      const li = SearchItem.createDOM(obj);
      this.searchList.append(li);
    });
  }
}

export default Search;
