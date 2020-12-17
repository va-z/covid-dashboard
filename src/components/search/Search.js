import './Search.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';

class Search extends FullscreenContainer {
  constructor() {
    super({ className: CLASSES.SEARCH.SEARCH });

    const text = Element.createDOM({
      tagName: TAGS.SPAN,
      textContent: 'Placeholder',
    });

    this.element.append(text);
  }
}

export default Search;
