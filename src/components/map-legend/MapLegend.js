import './MapLegend.scss';
import { radius } from '../../js/helpers/index';
import {
  TAGS,
  CLASSES,
  STRINGS,
  CONFIGS,
} from '../../js/constants/index';
import Element from '../_common/Element';

class MapLegend extends Element {
  constructor({ className, minArea, maxArea }) {
    super({ className: CLASSES.LEGEND });
    this.addClasses(className);

    const containerSide = `${parseInt(2 * radius.fromArea(maxArea), 10)}px`;
    const areas = [maxArea, ((maxArea - minArea) / 2), minArea];
    const { rows, rowTitles } = areas.reduce((acc, area) => {
      const [row, title] = MapLegend.createRow(area, containerSide);
      acc.rows.push(row);
      acc.rowTitles.push(title);
      return acc;
    }, { rows: [], rowTitles: [] });

    this.title = Element.createDOM({
      tagName: TAGS.H3,
      className: CLASSES.LEGEND__TITLE,
    });
    this.rowTitles = rowTitles;

    this.element.append(this.title, ...rows);
  }

  update({
    minVal,
    maxVal,
    state,
  }) {
    const values = [maxVal, (maxVal - minVal) / 2, minVal];
    values.forEach((value, index) => {
      this.rowTitles[index].textContent = MapLegend.formatAmount(value, state.amount);
    });

    this.element.dataset.status = state.status;
    this.title.textContent = state.getDescription();
  }

  static createRow(area, containerSide) {
    const side = `${parseInt(2 * radius.fromArea(area), 10)}px`;
    const row = Element.createDOM({ className: CLASSES.LEGEND__ROW });
    const circleContainer = Element.createDOM({
      className: CLASSES['LEGEND__CIRCLE-CONTAINER'],
      attrs: [
        ['style', `width: ${containerSide}; height: ${containerSide}`],
      ],
    });

    const circle = Element.createDOM({
      className: CLASSES.LEGEND__CIRCLE,
      attrs: [
        ['style', `width: ${side}; height: ${side}`],
      ],
    });
    const title = Element.createDOM({ tagName: TAGS.P });

    circleContainer.append(circle);
    row.append(circleContainer, title);
    return [row, title];
  }

  static formatAmount(val, amount) {
    switch (amount) {
      case STRINGS.AMOUNT.PER100K: {
        const [int, float] = `${val}`.split('.');
        return `${(+int).toLocaleString(CONFIGS.LOCALE)}.${float === undefined ? '0' : float.slice(0, 1)}`;
      }
      default:
        return parseInt(val, 10).toLocaleString(CONFIGS.LOCALE);
    }
  }
}

export default MapLegend;
