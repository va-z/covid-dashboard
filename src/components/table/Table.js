import './Table.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Toggle from '../_common/toggle/Toggle';

class Table extends FullscreenContainer {
  constructor() {
    super();
    this.addClasses(CLASSES.TABLE.TABLE);

    const title = Element.createDOM({
      tagName: TAGS.H2,
      className: CLASSES.TABLE.TABLE_TITLE,
      textContent: 'Global/Country',
    });

    this.table = Element.createDOM({
      tagName: TAGS.UL,
      className: CLASSES.TABLE.TABLE_BLOCK,
    });

    this.togglesContainer = Element.createDOM({
      className: CLASSES.STATIC.TOGGLES_CONTAINER,
    });

    this.togglePeriod = new Toggle({
      type: 'period',
      btnTitles: ['total', 'last day'],
    });

    this.toggleAmount = new Toggle({
      type: 'amount',
      btnTitles: ['abs', 'per 100K'],
    });

    this.controls = [
      this.togglePeriod,
      this.toggleAmount,
    ];

    this.togglesContainer.append(
      this.togglePeriod.element,
      this.toggleAmount.element,
    );
    this.element.append(title, this.table, this.togglesContainer);
  }

  update({ data, state, change }) {
    if (change) {
      this.controls.forEach((control) => {
        control.update(state);
      });
    }

    const { name } = state;
    const src = data.find((obj) => obj.name === name);

    console.log(src);
  }
}

export default Table;
