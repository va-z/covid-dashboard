import './Map.scss';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Tabs from '../_common/tabs/Tabs';
import Toggle from '../_common/toggle/Toggle';

class Map extends FullscreenContainer {
  constructor() {
    super();
    this.addClasses(CLASSES.MAP.MAP);
    this.circles = [];

    const mapWrapper = Element.createDOM({
      className: 'map-wrapper',
    });
    const mapContainer = Element.createDOM({
      className: 'map-container',
    });
    const togglesContainer = Element.createDOM({
      className: 'map__toggles',
    });

    this.map = L.map(mapContainer, {
      attributionControl: false,
    });
    this.map.setView([51.505, -0.09], 3);
    const attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    const tiles = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';
    const accessToken = 'pk.eyJ1IjoidmEteiIsImEiOiJja2l6eDllcG0wNWp2MzNxajl0NTc3a2pkIn0.LB0pyLi9ckMonbnpiQ-i9g';

    L
      .tileLayer(tiles, {
        attribution,
        accessToken,
        maxZoom: 18,
        minZoom: 1,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
      })
      .addTo(this.map);

    L.control.attribution({
      attribution,
      position: 'topright',
    }).addTo(this.map);

    setTimeout(() => this.map.invalidateSize(), 500);

    this.togglePeriod = new Toggle({
      type: 'period',
      btnTitles: ['total', 'last day'],
    });

    this.toggleAmount = new Toggle({
      type: 'amount',
      btnTitles: ['abs', 'per 100K'],
    });

    this.tabs = new Tabs();

    this.controls = [
      this.togglePeriod,
      this.toggleAmount,
      this.tabs,
    ];

    togglesContainer.append(this.togglePeriod.element, this.toggleAmount.element);
    mapWrapper.append(mapContainer, togglesContainer);
    this.element.append(mapWrapper, this.tabs.element);
  }

  update({ state, data, change }) {
    if (change) {
      this.controls.forEach((control) => {
        control.update(state);
      });

      if (Object.keys(change)[0] === 'name') {
        return;
      }
    }

    this.mapData(data, state);
  }

  mapData(data, state) {
    this.circles.forEach((m) => {
      this.map.removeLayer(m);
    });

    const key = state.getKey();
    const [minVal, maxVal, filteredData] = Map.filterData(data, key);

    filteredData.forEach(({
      name,
      lat,
      long,
      val,
    }) => {
      if (name !== 'World') {
        const radius = Map.getRadius(val, minVal, maxVal);
        const color = Map.getColor(state.status);

        const circle = L.circle([lat, long], {
          color,
          fillColor: color,
          fillOpacity: '0.3',
          radius,
        })
          .bindTooltip(`${name} - ${state.getDescription()} - ${val.toLocaleString('ru-RU')}`)
          .addTo(this.map);

        this.circles.push(circle);
      }
    });
  }

  static filterData(data, key) {
    let minVal = Infinity;
    let maxVal = 0;

    const filteredData = data.map((datum) => {
      const {
        name, lat, long, [key]: val,
      } = datum;

      if (name !== 'World') {
        if (val < minVal) {
          minVal = val;
        }

        if (val > maxVal) {
          maxVal = val;
        }
      }

      return {
        name,
        lat,
        long,
        val,
      };
    });

    return [minVal, maxVal, filteredData];
  }

  static getRadius(val, minVal, maxVal) {
    const maxR = 1500000;
    const minR = 10000;
    const R = ((maxR) * (val - minVal)) / (maxVal - minVal);

    return R < minR ? minR : R;
  }

  static getColor(status) {
    const colors = {
      cases: 'yellow',
      deaths: 'red',
      recovered: 'green',
    };

    return colors[status];
  }
}

export default Map;
