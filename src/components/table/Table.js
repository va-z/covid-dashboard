import './Table.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import TableRow from '../_common/tableRow/TableRow';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Toggle from '../_common/toggle/Toggle';

class Table extends FullscreenContainer {
  constructor() {
    super();
    this.addClasses(CLASSES.TABLE.TABLE);
    this.statuses = ['Cases', 'Deaths', 'Recovered'];
    this.rows = [];

    this.title = Element.createDOM({
      tagName: TAGS.H2,
      className: CLASSES.TABLE.TABLE_TITLE,
      textContent: 'Global/Country',
    });

    const table = Element.createDOM({
      tagName: TAGS.UL,
      className: CLASSES.TABLE.TABLE_BLOCK,
    });

    this.statuses.forEach((status) => {
      this[`${status}Row`] = new TableRow({
        status,
        outerClasses: CLASSES.TABLE[`TABLE-ROW-${status.toUpperCase()}`],
      });
      this.rows.push(this[`${status}Row`]);
      table.append(this[`${status}Row`].element);
    });

    const togglesContainer = Element.createDOM({
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

    togglesContainer.append(
      this.togglePeriod.element,
      this.toggleAmount.element,
    );
    this.element.append(
      this.title,
      table,
      togglesContainer,
    );
  }

  update({ data, state, change }) {
    if (change) {
      this.controls.forEach((control) => {
        control.update(state);
      });
    }

    const { name, figure, amount } = state;
    const src = data.find((obj) => obj.name === name);
    this.title.textContent = name;

    this.statuses.forEach((status, ind) => {
      const key = figure + status + (amount === 'abs' ? '' : '100k');
      const val = src[key];

      this.rows[ind].update(val);
    });
  }
}

export default Table;
