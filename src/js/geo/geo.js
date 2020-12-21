import {
  select,
  geoMercator,
  geoPath,
  zoom,
} from 'd3';
import { feature } from 'topojson-client';
import geodata from './geodata.json';

function geo(data) {
  const svg = select('.map-container')
    .append('svg')
    .attr('height', '900')
    .attr('width', '900');

  const proj = geoMercator();
  const pathGenerator = geoPath().projection(proj);
  const g = svg.append('g');

  g.append('path')
    .attr('fill', 'red')
    .attr('d', pathGenerator({ type: 'Sphere' }));

  svg.call(
    zoom().on('zoom', (event) => {
      g.attr('transform', event.transform);
    }),
  );

  const countries = feature(geodata, geodata.objects.countries1);

  g.selectAll('path').data(countries.features)
    .enter().append('path')
    .attr('fill', 'black')
    .attr('d', pathGenerator)
    .append('title')
    .text((obj) => obj.properties.name);
}

export default geo;
