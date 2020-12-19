import './Table.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Toggle from '../_common/toggle/Toggle';

class Table extends FullscreenContainer {
  constructor() {
    super({ className: CLASSES.TABLE.TABLE });

    const title = Element.createDOM({
      tagName: TAGS.H2,
      className: CLASSES.TABLE.TABLE_TITLE,
      textContent: 'Global/Country',
    });

    this.table = Element.createDOM({
      className: CLASSES.TABLE.TABLE_BLOCK,
      textContent: 'Table will be here',
    });

    this.togglesContainer = Element.createDOM({
      className: CLASSES.STATIC.TOGGLES_CONTAINER,
    });

    this.togglePeriod = Toggle.createDOM({
      type: 'period',
      btnTitles: ['total', 'last day'],
    });

    this.toggleAmount = Toggle.createDOM({
      type: 'amount',
      btnTitles: ['abs', 'per 100K'],
    });

    this.togglesContainer.append(this.togglePeriod, this.toggleAmount);

    this.element.append(title, this.table, this.togglesContainer);
  }
}

export default Table;
