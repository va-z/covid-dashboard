import './SearchSuggestion.scss';
import { TAGS } from '../../js/constants/index';
import Element from '../_common/Element';

class SearchSuggestion extends Element {
  constructor(name) {
    super({
      tagName: TAGS.P,
      className: 'search-suggestion',
      textContent: name,
    });

    this.name = name;

    this.element.addEventListener('click', () => {
      const event = new CustomEvent('suggestionClicked', {
        bubbles: true,
        detail: {
          name: this.name,
        },
      });

      this.element.dispatchEvent(event);
    });
  }
}

export default SearchSuggestion;
