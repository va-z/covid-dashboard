import './SVGWrapper.scss';
import { CLASSES } from '../../../js/constants/index';
import Element from '../Element';

class SVGWrapper extends Element {
  constructor({
    className,
    attrs = [],
  } = {}) {
    super({ className: CLASSES.STATIC.SVG_WRAPPER });

    const attrsStr = attrs.flatMap(([attr, val]) => `${attr}="${val}"`).join(' ');
    const svgStr = `
    <svg  xmlns="http://www.w3.org/2000/svg"
          class="${className}"
          ${attrsStr}>
    </svg>`;

    this.element.innerHTML += svgStr;
  }
}

export default SVGWrapper;
