import './TableRow.scss';
import { TAGS, CLASSES } from '../../../js/constants/index';
import Element from '../Element';

class TableRow extends Element {
  constructor({ status, outerClasses } = {}) {
    super({
      tagName: TAGS.LI,
      className: `${CLASSES.TABLE['TABLE-ROW']}`,
    });
    this.addClasses(outerClasses);

    const title = Element.createDOM({
      tagName: TAGS.P,
      className: CLASSES.TABLE['TABLE-ROW_TITLE'],
      textContent: status,
    });

    this.value = Element.createDOM({
      className: CLASSES.TABLE['TABLE-ROW_VALUE'],
    });

    this.element.append(title, this.value);
  }

  update(val) {
    this.value.textContent = val.toLocaleString('ru-RU');
  }
}

export default TableRow;
