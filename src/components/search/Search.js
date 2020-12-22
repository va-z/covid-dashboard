import './Search.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import SearchInput from '../searchInput/SearchInput';
import SearchItem from '../_common/searchItem/SearchItem';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Toggle from '../_common/toggle/Toggle';
import Tabs from '../_common/tabs/Tabs';

class Search extends FullscreenContainer {
  constructor() {
    super();
    this.addClasses(CLASSES.SEARCH.SEARCH);
    this.names = [];
    this.listItems = [];

    const title = Element.createDOM({
      tagName: TAGS.H2,
      className: CLASSES.SEARCH.SEARCH_TITLE,
      textContent: 'Cases by countries',
    });
    const togglesContainer = Element.createDOM({
      className: CLASSES.STATIC.TOGGLES_CONTAINER,
    });

    this.searchInput = new SearchInput();

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
      this.searchInput.element,
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

      if (Object.keys(change)[0] === 'name') {
        this.listItems.forEach((item) => {
          if (state.name === item.dataset.stateName) {
            item.classList.add('search-item--active');
          } else {
            item.classList.remove('search-item--active');
          }
        });

        this.scrollToActive();
        return;
      }
    }

    const key = state.getKey();
    const filteredData = data
      .map((obj) => ({
        flag: obj.flag,
        name: obj.name,
        value: obj[key],
      }))
      .sort(({ value: val1 }, { value: val2 }) => val2 - val1);

    if (this.names.length === 0) {
      filteredData.forEach((obj) => {
        const li = SearchItem.createDOM({ ...obj, currentName: state.name });
        this.searchList.append(li);
        this.names.push(obj.name);
        this.listItems.push(li);
      });

      this.searchInput.getNames(this.names);
    } else {
      this.listItems = [];
      this.searchList.innerHTML = '';

      filteredData.forEach((obj) => {
        const li = SearchItem.createDOM({ ...obj, currentName: state.name });
        this.searchList.append(li);
        this.listItems.push(li);
      });
    }

    this.scrollToActive();
  }

  scrollToActive() {
    const activeItem = this.listItems.find((elem) => elem.classList.contains('search-item--active'));
    activeItem.scrollIntoView({
      behavior: 'smooth',
    });
  }
}

export default Search;
