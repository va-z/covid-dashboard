import './MapLegend.scss';
import Element from '../_common/Element';

class MapLegend extends Element {
  constructor(minA, maxA) {
    super({ className: 'map-legend' });

    const maxSide = `${parseInt(2 * Math.sqrt(maxA / Math.PI), 10)}px`;
    const midSide = `${parseInt(2 * Math.sqrt((maxA - minA) / (2 * Math.PI)), 10)}px`;
    const minSide = `${parseInt(2 * Math.sqrt(minA / Math.PI), 10)}px`;

    this.title = Element.createDOM({
      tagName: 'h3',
      className: 'map-legend__title',
      textContent: '',
    });

    const maxRow = Element.createDOM({
      className: 'map-legend__row',
    });
    const midRow = Element.createDOM({
      className: 'map-legend__row',
    });
    const minRow = Element.createDOM({
      className: 'map-legend__row',
    });

    const maxContainer = Element.createDOM({
      className: 'map-legend__circle-container',
      attrs: [
        ['style', `width: ${maxSide}; height: ${maxSide}`],
      ],
    });
    this.maxCircle = Element.createDOM({
      className: 'map-legend__circle',
      attrs: [
        ['style', `width: ${maxSide}; height: ${maxSide}`],
      ],
    });

    const midContainer = Element.createDOM({
      className: 'map-legend__circle-container',
      attrs: [
        ['style', `width: ${maxSide}; height: ${maxSide}`],
      ],
    });
    this.midCircle = Element.createDOM({
      className: 'map-legend__circle',
      attrs: [
        ['style', `width: ${midSide}; height: ${midSide}`],
      ],
    });

    const minContainer = Element.createDOM({
      className: 'map-legend__circle-container',
      attrs: [
        ['style', `width: ${maxSide}; height: ${maxSide}`],
      ],
    });
    this.minCircle = Element.createDOM({
      className: 'map-legend__circle',
      attrs: [
        ['style', `width: ${minSide}; height: ${minSide}`],
      ],
    });

    this.maxTitle = Element.createDOM({
      tagName: 'p',
    });

    this.midTitle = Element.createDOM({
      tagName: 'p',
    });

    this.minTitle = Element.createDOM({
      tagName: 'p',
    });

    maxContainer.append(this.maxCircle);
    midContainer.append(this.midCircle);
    minContainer.append(this.minCircle);

    maxRow.append(maxContainer, this.maxTitle);
    midRow.append(midContainer, this.midTitle);
    minRow.append(minContainer, this.minTitle);

    this.element.append(
      this.title,
      maxRow,
      midRow,
      minRow,
    );
  }

  update({
    minVal,
    maxVal,
    title,
    status,
  }) {
    this.title.textContent = title;
    this.maxTitle.textContent = maxVal.toLocaleString('ru-RU');
    this.midTitle.textContent = parseInt(((maxVal - minVal) / 2), 10).toLocaleString('ru-RU');
    this.minTitle.textContent = minVal.toLocaleString('ru-RU');

    this.maxCircle.style.backgroundColor = `${MapLegend.getColor(status)}69`;
    this.midCircle.style.backgroundColor = `${MapLegend.getColor(status)}69`;
    this.minCircle.style.backgroundColor = `${MapLegend.getColor(status)}69`;

    this.maxCircle.style.borderColor = `${MapLegend.getColor(status)}`;
    this.minCircle.style.borderColor = `${MapLegend.getColor(status)}`;
    this.midCircle.style.borderColor = `${MapLegend.getColor(status)}`;
  }

  static getColor(status) {
    const colors = {
      cases: '#9f0000',
      deaths: '#5d1048',
      recovered: '#ff523c',
    };

    return colors[status];
  }
}

export default MapLegend;
