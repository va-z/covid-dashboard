import {
  select,
  scaleLinear,
  scaleBand,
  max,
  axisLeft,
  axisBottom,
  format,
  timeFormat,
} from 'd3';
import { TAGS } from './constants/index';

function graphDrow(allData, state) {
  const key = state.getKey();
  const currentCountry = allData.find((obj) => (obj.name === state.name));
  const currentData = currentCountry.historic;
  //console.log(currentData);

  const svg = select('.graph__block')
    .append(`${TAGS.SVG}`)
    .attr('height', '300')
    .attr('width', '500');

  const width = +svg.attr('width');
  const height = +svg.attr('height');

  const render = (data) => {
    const xValue = (d) => d.date;
    const yValue = (d) => d[key];
    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 40,
    };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleBand()
      .domain(data.map(xValue))
      .range([0, innerWidth]);

    const yScale = scaleLinear()
      .domain([0, max(data, yValue)])
      .range([innerHeight, 0])
      .nice();

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = axisBottom(xScale)
      .tickFormat(timeFormat(12, '%B'));

    const yAxis = axisLeft(yScale)
      .tickFormat(format('.2s'))
      .tickSize(-innerWidth);

    g.append('g').call(yAxis);
    g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);

    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', (d) => yScale(yValue(d)))
      .attr('x', (d) => xScale(xValue(d)))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight - yScale(yValue(d)));
  };

  render(currentData);

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
