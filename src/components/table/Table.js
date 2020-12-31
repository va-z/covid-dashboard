import './Table.scss';
import { cap } from '../../js/helpers/index';
import { TAGS, CLASSES, STRINGS } from '../../js/constants/index';
import Element from '../_common/Element';
import ContentContainer from '../_common/content-container/ContentContainer';
import ControlsToggles from '../_common/controls-toggles/ControlsToggles';

const statusArr = Object.values(STRINGS.STATUS);

class Table extends ContentContainer {
  constructor({ blockClassName }) {
    super({ className: CLASSES.TABLE });
    this.addClasses(blockClassName);

    const table = Element.createDOM({
      tagName: TAGS.UL,
      className: CLASSES.TABLE__BLOCK,
    });

    this.values = Table.createTableRows(statusArr, table);

    this.title = Element.createDOM({
      tagName: TAGS.H2,
      className: CLASSES.TABLE__TITLE,
    });
    this.toggles = new ControlsToggles({ hostClassName: CLASSES.TABLE });

    this.element.append(
      this.title,
      table,
      this.toggles.element,
    );
  }

  update({ data, state, change }) {
    this.toggles.update(state);

    if (change && change[0] === 'status') {
      return;
    }

    const { name, period, amount } = state;
    const src = data.find((obj) => obj.name === name);
    this.title.textContent = name;

    statusArr.forEach((status) => {
      const key = period + cap(status) + (amount === 'abs' ? '' : '100k');
      this.values[status].textContent = src[key].toLocaleString('ru-RU');
    });
  }

  static createTableRows(arr, parent) {
    const result = arr.reduce((acc, status) => {
      const row = Element.createDOM({
        tagName: TAGS.LI,
        className: CLASSES.TABLE__ROW,
        textContent: cap(status),
      });
      const value = Element.createDOM({ tagName: TAGS.P });

      row.append(value);
      parent.append(row);
      acc[status] = value;
      return acc;
    }, {});

    return result;
  }
}

export default Table;
