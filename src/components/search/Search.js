import './Search.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import ContentContainer from '../_common/content-container/ContentContainer';
import ControlsTabs from '../_common/controls-tabs/ControlsTabs';
import ControlsToggles from '../_common/controls-toggles/ControlsToggles';
import SearchInput from '../search-input/SearchInput';
import SearchItem from '../search-item/SearchItem';

class Search extends ContentContainer {
  constructor({ blockClassName }) {
    super({ className: CLASSES.SEARCH });
    this.addClasses(blockClassName);

    const title = Element.createDOM({
      tagName: TAGS.H2,
      className: CLASSES.SEARCH__TITLE,
      textContent: 'Cases by countries',
    });
    const listWrapper = Element.createDOM({ className: CLASSES['SEARCH__LIST-WRAPPER'] });

    this.searchInput = new SearchInput({ blockClassName: CLASSES.SEARCH__INPUT });
    this.list = Element.createDOM({
      tagName: TAGS.UL,
      className: CLASSES.SEARCH__LIST,
    });
    this.toggles = new ControlsToggles({ hostClassName: CLASSES.SEARCH });
    this.tabs = new ControlsTabs({ hostClassName: CLASSES.SEARCH });

    listWrapper.append(this.list);
    this.element.append(
      title,
      this.searchInput.element,
      listWrapper,
      this.toggles.element,
      this.tabs.element,
    );

    this.list.addEventListener('click', (event) => {
      const item = event.target.closest(`.${CLASSES['SEARCH-ITEM']}`);

      if (item) {
        Search.fireEvent({
          dispatcher: this.element,
          name: 'updateRequest',
          bubbles: true,
          detail: { change: ['name', item.dataset.name] },
        });
      }
    });
  }

  update({ data, state, change }) {
    this.tabs.update(state);
    this.toggles.update(state);

    if (change && change[0] === 'name') {
      this.searchItemsDOM.forEach((item) => {
        SearchItem.setActiveDOM(item, change[1]);
      });

      return;
    }

    const key = state.getKey();

    if (!this.searchItemsDOM) {
      this.init(data, state, key);
      return;
    }

    const filteredData = data.map((datum) => ({
      flag: datum.flag,
      name: datum.name,
      value: datum[key],
      currentName: state.name,
    })).sort(({ value: v1 }, { value: v2 }) => v2 - v1);

    this.searchItemsDOM.forEach((item, index) => {
      SearchItem.updateDOM(item, filteredData[index]);
    });
  }

  init(data, state, key) {
    const names = [];
    const filteredData = data.map((datum) => {
      names.push(datum.name);
      return {
        flag: datum.flag,
        name: datum.name,
        value: datum[key],
        currentName: state.name,
      };
    }).sort(({ value: v1 }, { value: v2 }) => v2 - v1);

    this.searchInput.names = names;
    this.searchItemsDOM = filteredData.map((datum) => SearchItem.createDOM(datum));
    this.list.append(...this.searchItemsDOM);
  }
}

export default Search;
