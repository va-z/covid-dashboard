import {
  select,
} from 'd3';
import { TAGS } from './constants/index';

function graphDrow(data) {
  const svg = select('.graph__block')
    .append(`${TAGS.SVG}`)
    .attr('height', '300')
    .attr('width', '500');

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', 300)
    .attr('height', 300);

  // this.svgContainer = Element.createDOM({
  //   tagName: TAGS.SVG,
  //   className: CLASSES.GRAPH['GRAPH_SVG-CONTAINER'],
  //   attrs: [['width', '350'],
  //     ['height', '200'],
  //     ['viewBox', '0 0 180 180'],
  //     ['preserveAspectRatio', 'none']],
  // });
}

export default graphDrow;
