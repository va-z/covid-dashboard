import './Map.scss';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Tabs from '../_common/tabs/Tabs';
import Toggle from '../_common/toggle/Toggle';
import MapLegend from '../map-legend/MapLegend';

class Map extends FullscreenContainer {
  constructor() {
    super();
    this.addClasses(CLASSES.MAP.MAP);
    this.circles = [];
    this.minA = 50;
    this.maxA = 750;

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
        minZoom: 2,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
      })
      .addTo(this.map);

    L.control.attribution({
      attribution,
      position: 'topright',
    }).addTo(this.map);

    const bounds = L.latLngBounds([
      [-90, -180], [90, 180],
    ]);

    this.map.setMaxBounds(bounds);

    this.legend = new MapLegend(this.minA, this.maxA);

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
    mapWrapper.append(mapContainer, togglesContainer, this.legend.element);
    this.element.append(mapWrapper, this.tabs.element);

    this.element.addEventListener('fullscreenSet', () => {
      this.map.invalidateSize();
    });
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
    const key = state.getKey();
    const [minVal, maxVal, filteredData] = Map.filterData(data, key);
    const { minA, maxA } = this;

    this.legend.update({
      minVal,
      maxVal,
      title: state.getDescription(),
      status: state.status,
    });

    if (this.circles.length === 0) {
      filteredData.forEach(({
        name,
        lat,
        long,
        val,
      }) => {
        const radius = Map.getRadius(val, minVal, maxVal, minA, maxA);
        const color = Map.getColor(state.status);

        const circle = L.circleMarker([lat, long], {
          color,
          fillColor: color,
          fillOpacity: '0.3',
          radius,
        })
          .bindTooltip(`${name} - ${state.getDescription()} - ${val.toLocaleString('ru-RU')}`)
          .addTo(this.map);

        circle.addEventListener('click', () => {
          Map.sendUpdateRequest(this.element, 'name', name);
        });

        this.circles.push(circle);
      });
    } else {
      this.circles.forEach((circle, index) => {
        const { name, val } = filteredData[index];
        const radius = Map.getRadius(val, minVal, maxVal, minA, maxA);
        const color = Map.getColor(state.status);

        circle.setRadius(radius);
        circle.setTooltipContent(`${name} - ${state.getDescription()} - ${val.toLocaleString('ru-RU')}`);
        circle.setStyle({
          color,
          fillColor: color,
        });
      });
    }
  }

  static filterData(data, key) {
    let minVal = Infinity;
    let maxVal = 0;

    const filteredData = data.reduce((acc, datum) => {
      const {
        name, lat, long, [key]: val,
      } = datum;

      if (name === 'World') {
        return acc;
      }

      if (val < minVal) {
        minVal = val;
      }

      if (val > maxVal) {
        maxVal = val;
      }

      acc.push({
        name,
        lat,
        long,
        val,
      });

      return acc;
    }, []);

    return [minVal, maxVal, filteredData];
  }

  static getRadius(val, minVal, maxVal, minA, maxA) {
    let A0 = ((maxA) * (val - minVal)) / (maxVal - minVal);

    if (A0 < minA) {
      A0 = minA;
    }

    return Math.sqrt(A0 / Math.PI);
  }

  static getColor(status) {
    const colors = {
      cases: '#9f0000',
      deaths: '#8d3f74',
      recovered: '#ff523c',
    };

    return colors[status];
  }
}

export default Map;
