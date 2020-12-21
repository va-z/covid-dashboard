import './scss/index.scss';
/* map */
import { select, geoMercator, geoPath } from 'd3';
import { feature } from 'topojson-client';
import geodata from './js/geo/geodata.json';
/*  */

import App from './js/App';

App.create(document.body);

/* map */
const svg = select('.map-container')
  .append('svg')
  .attr('height', '500')
  .attr('width', '500');

const proj = geoMercator();
const pathGenerator = geoPath().projection(proj);

svg.append('path')
  .attr('fill', 'red')
  .attr('d', pathGenerator({ type: 'Sphere' }));

const countries = feature(geodata, geodata.objects.countries1);

svg.selectAll('path').data(countries.features)
  .enter().append('path')
  .attr('fill', 'black')
  .attr('d', pathGenerator)
  .append('title')
  .text((obj) => obj.properties.name);
/*  */
