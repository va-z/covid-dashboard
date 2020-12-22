import './SearchInput.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import SearchSuggestion from '../searchSuggestion/SearchSuggestion';

class SearchInput extends Element {
  constructor() {
    super({ className: 'search-input__wrapper' });

    this.input = Element.createDOM({
      tagName: TAGS.INPUT,
      className: CLASSES.SEARCH.SEARCH_INPUT,
      attrs: [
        ['type', 'text'],
        ['placeholder', 'Type to search'],
      ],
    });

    this.dropdown = Element.createDOM({
      className: 'search-input__dropdown',
    });

    this.element.append(
      this.input,
      this.dropdown,
    );

    this.input.addEventListener('input', () => {
      const { value } = this.input;

      if (value === '') {
        this.dropdown.innerHTML = '';
      }

      this.addSuggestions(value);
    });

    this.input.addEventListener('focus', () => {
      const { value } = this.input;

      if (value !== '') {
        this.addSuggestions(value);
      }
    });

    this.element.addEventListener('suggestionClicked', (event) => {
      const { name } = event.detail;

      this.dropdown.innerHTML = '';
      this.input.value = name;

      SearchInput.sendUpdateRequest(this.element, 'name', name);
    });
  }

  addSuggestions(value) {
    this.dropdown.innerHTML = '';
    const regex = new RegExp(`^${value}`, 'i');
    const filtered = this.names.filter((item) => regex.test(item));

    filtered.forEach((name) => {
      const suggestion = SearchSuggestion.createDOM(name);

      this.dropdown.append(suggestion);
    });
  }

  getNames(arr) {
    this.names = arr;
  }
}

export default SearchInput;
