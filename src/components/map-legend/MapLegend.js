import './MapLegend.scss';
import { radius, formatNumber } from '../../js/helpers/index';
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

    const maxDiameter = 2 * radius.fromArea(maxArea);
    const containerSide = formatNumber.toPixelString(maxDiameter);

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
      this.rowTitles[index].textContent = MapLegend.formatLegendAmount(value, state.amount);
    });

    this.element.dataset.status = state.status;
    this.title.textContent = state.getDescription();
  }

  static createRow(area, containerSide) {
    const currentDiameter = 2 * radius.fromArea(area);
    const side = formatNumber.toPixelString(currentDiameter);

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

  static formatLegendAmount(val, amount) {
    switch (amount) {
      case STRINGS.AMOUNT.PER100K:
        return formatNumber.toNamelessString(val);
      default:
        return parseInt(val, 10).toLocaleString(CONFIGS.LOCALE);
    }
  }
}

export default MapLegend;
