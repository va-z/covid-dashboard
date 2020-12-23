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
        ['id', 'input'],
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
        setTimeout(() => {
          this.dropdown.innerHTML = '';
        }, 100);
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

    this.element.addEventListener('keydown', (event) => {
      const keyCond = event.key === 'Enter';

      if (keyCond) {
        this.handleEnter();
      }
    });

    document.addEventListener('click', (event) => {
      const isInput = event.target.classList.contains('search__input');
      const isDropdown = event.target.closest('.search-input__dropdown');
      const isVirtualKeyboard = event.target.closest('.simple-keyboard');

      if (!isInput && !isDropdown && !isVirtualKeyboard) {
        this.input.blur();
        this.dropdown.innerHTML = '';
      }
    });
  }

  handleEnter() {
    const { value } = this.input;
    const valCond = value !== '';

    if (valCond) {
      let name = this.names.find((str) => str === value);

      if (name) {
        SearchInput.sendUpdateRequest(this.element, 'name', name);
        this.dropdown.innerHTML = '';
      } else if (this.dropdown.children.length !== 0) {
        name = this.dropdown.firstElementChild.textContent;
        this.input.value = name;
        SearchInput.sendUpdateRequest(this.element, 'name', name);
        this.dropdown.innerHTML = '';
      } else {
        this.input.style.backgroundColor = '#eb4034';

        setTimeout(() => {
          this.input.style.backgroundColor = '';
        }, 300);
      }
    }
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
