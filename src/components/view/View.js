import './View.scss';
import { TAGS, CSS_CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';

class View extends Element {
  constructor(parent) {
    super({ tagName: TAGS.MAIN, className: CSS_CLASSES.VIEW });

    /* Prepend this.element after appending all contents */
    parent.insertAdjacentElement('afterbegin', this.element);
  }
}

export default View;
