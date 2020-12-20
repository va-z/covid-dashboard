import './scss/index.scss';
/* map */
import { select, geoMercator, geoPath } from 'd3';
import { feature } from 'topojson-client';
import countries110m from './js/geo/countries-110m.json';
/*  */

import App from './js/App';

App.create(document.body);

/* map */
const svg = select('.map__block');

const proj = geoMercator();
const pathGenerator = geoPath().projection(proj);

svg.append('path')
  .attr('fill', 'red')
  .attr('d', pathGenerator({ type: 'Sphere' }));

const countries = feature(countries110m, countries110m.objects.countries);

svg.selectAll('path').data(countries.features)
  .enter().append('path')
  .attr('fill', 'black')
  .attr('d', pathGenerator);
/*  */
