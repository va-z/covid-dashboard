import {
  select,
  zoom,
  geoPath,
  geoMercator,
} from 'd3';
import { feature } from 'topojson-client';
import { NUMBERS } from '../constants/index';
import geodata from './geodata.json';

let lastWindowHeight = window.innerHeight;

function geo() {
  const container = document.querySelector('.map.fullscreen');
  const tabs = container.querySelector('.tabs-container');
  let height = container.clientHeight - NUMBERS.TWO * tabs.offsetHeight;

  const svg = select('.map-container')
    .append('svg')
    .attr('height', height)
    .attr('preserveAspectRatio', 'none');

  const { width } = document.querySelector('.map-container svg')
    .getBoundingClientRect();

  window.addEventListener('resize', function changeMapHeight() {
    const windowHeight = window.innerHeight;
    const delta = lastWindowHeight - windowHeight;
    lastWindowHeight = windowHeight;

    svg.attr('height', height - delta);
    height -= delta;
    window.removeEventListener('reset', changeMapHeight);
  });

  const maxLat = NUMBERS.EIGHTY_THREE;

  const proj = geoMercator()
    .translate([width / 2, height / 2])
    .scale(1);

  function mercatorBounds(projection, maxlat) {
    const yaw = projection.rotate()[0];
    const xyMax = projection([-yaw + 180 - 1e-6, -maxlat]);
    const xyMin = projection([-yaw - 180 + 1e-6, maxlat]);

    return [xyMin, xyMax];
  }

  const bounds = mercatorBounds(proj, maxLat);
  const size = width / (bounds[1][0] - bounds[0][0]);
  const scales = [size, 5 * size];

  proj.scale(scales[0]);

  const g = svg.append('g').call(zoom);
  const path = geoPath().projection(proj);

  g.append('path')
    .attr('fill', 'red')
    .attr('d', path({ type: 'Sphere' }));

  const countries = feature(geodata, geodata.objects.countries);

  g.selectAll('path').data(countries.features)
    .enter().append('path')
    .attr('fill', 'black')
    .attr('d', path)
    .append('title')
    .text((obj) => obj.properties.name);

  const gDOM = document.querySelector('#mapId > svg > g');
  const { height: maxHeight, width: maxWidth } = gDOM.getBoundingClientRect();

  svg.call(
    zoom()
      .scaleExtent([1, 5])
      .translateExtent([[0, 0], [maxHeight, maxWidth]])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      }),
  );
}

export default geo;
