import './MapLegend.scss';
import Element from '../_common/Element';

class MapLegend extends Element {
  constructor(minA, maxA) {
    super({ className: 'map-legend' });

    const containerSide = `${parseInt(2 * Math.sqrt(maxA / Math.PI), 10)}px`;
    const maxRow = this.createRow(maxA, 'max', containerSide);
    const midRow = this.createRow((maxA - minA) / 2, 'mid', containerSide);
    const minRow = this.createRow(minA / 2, 'min', containerSide);

    this.title = Element.createDOM({
      tagName: 'h3',
      className: 'map-legend__title',
      textContent: '',
    });

    this.element.append(
      this.title,
      maxRow,
      midRow,
      minRow,
    );

    this.circles = [
      this.maxCircle,
      this.midCircle,
      this.minCircle,
    ];
  }

  update({
    minVal,
    maxVal,
    title,
    status,
  }) {
    this.title.textContent = title;
    this.maxTitle.textContent = maxVal.toLocaleString('ru-RU');
    this.midTitle.textContent = ((maxVal - minVal) / 2).toLocaleString('ru-RU');
    this.minTitle.textContent = minVal.toLocaleString('ru-RU');

    this.circles.forEach((circle) => {
      const c = circle;
      c.style.backgroundColor = `${MapLegend.getColor(status)}5`;
      c.style.borderColor = `${MapLegend.getColor(status)}`;
    });
  }

  createRow(area, type, containerSide) {
    const side = `${parseInt(2 * Math.sqrt(area / Math.PI), 10)}px`;
    const row = Element.createDOM({
      className: 'map-legend__row',
    });
    const container = Element.createDOM({
      className: 'map-legend__circle-container',
      attrs: [
        ['style', `width: ${containerSide}; height: ${containerSide}`],
      ],
    });

    this[`${type}Circle`] = Element.createDOM({
      className: 'map-legend__circle',
      attrs: [
        ['style', `width: ${side}; height: ${side}`],
      ],
    });

    this[`${type}Title`] = Element.createDOM({
      tagName: 'p',
    });

    container.append(this[`${type}Circle`]);
    row.append(container, this[`${type}Title`]);
    return row;
  }

  static getColor(status) {
    const colors = {
      cases: '#FF0',
      deaths: '#F00',
      recovered: '#4e0',
    };

    return colors[status];
  }
}

export default MapLegend;
