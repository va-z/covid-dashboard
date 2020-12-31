import './Map.scss';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { radius, getMarkerColor } from '../../js/helpers/index';
import { CLASSES, CONFIGS } from '../../js/constants/index';
import Element from '../_common/Element';
import ContentContainer from '../_common/content-container/ContentContainer';
import ControlsTabs from '../_common/controls-tabs/ControlsTabs';
import ControlsToggles from '../_common/controls-toggles/ControlsToggles';
import MapLegend from '../map-legend/MapLegend';

class Map extends ContentContainer {
  constructor({ blockClassName }) {
    super({ className: CLASSES.MAP });
    this.addClasses(blockClassName);

    const mapWrapper = Element.createDOM({ className: CLASSES.MAP__WRAPPER });
    const mapContainer = Element.createDOM({ className: CLASSES.MAP__CONTAINER });

    this.circles = [];
    this.map = Map.createLeafletMap(mapContainer);
    this.legend = new MapLegend({
      className: CLASSES.MAP__LEGEND,
      minArea: CONFIGS.MAP.MIN_MARKER_AREA,
      maxArea: CONFIGS.MAP.MAX_MARKER_AREA,
    });
    this.toggles = new ControlsToggles({ hostClassName: CLASSES.MAP });
    this.tabs = new ControlsTabs({ hostClassName: CLASSES.MAP });

    mapWrapper.append(mapContainer, this.toggles.element, this.legend.element);
    this.element.append(mapWrapper, this.tabs.element);

    this.element.addEventListener('fullscreenSet', () => {
      this.map.invalidateSize();
    });
  }

  update({ state, data, change }) {
    this.tabs.update(state);
    this.toggles.update(state);

    if (change && change[0] === 'name') {
      return;
    }

    this.mapData(data, state);
  }

  mapData(data, state) {
    const key = state.getKey();
    const [minVal, maxVal, filteredData] = Map.filterData(data, key);
    const minA = CONFIGS.MAP.MIN_MARKER_AREA;
    const maxA = CONFIGS.MAP.MAX_MARKER_AREA;

    this.legend.update({ minVal, maxVal, state });

    if (this.circles.length === 0) {
      filteredData.forEach(({
        name,
        lat,
        long,
        val,
      }) => {
        const r = radius.fromValue(val, minVal, maxVal, minA, maxA);
        const color = getMarkerColor(state.status);

        const circle = L.circleMarker([lat, long], {
          color,
          fillColor: color,
          fillOpacity: CONFIGS.MAP.FILL_OPACITY,
          radius: r,
        })
          .bindTooltip(`${name} - ${state.getDescription()} - ${val.toLocaleString('ru-RU')}`)
          .addTo(this.map);

        circle.addEventListener('click', () => {
          Map.fireEvent({
            dispatcher: this.element,
            name: 'updateRequest',
            bubbles: true,
            detail: { change: ['name', name] },
          });
        });

        this.circles.push(circle);
      });
    } else {
      this.circles.forEach((circle, index) => {
        const { name, val } = filteredData[index];
        const r = radius.fromValue(val, minVal, maxVal, minA, maxA);
        const color = getMarkerColor(state.status);

        circle.setStyle({
          color,
          fillColor: color,
        });
        circle.setRadius(r);
        circle.setTooltipContent(
          `${name} - ${state.getDescription()} - ${val.toLocaleString('ru-RU')}`,
        );
      });
    }
  }

  static filterData(data, key) {
    let minVal = Infinity;
    let maxVal = 0;

    const filteredData = data.reduce((acc, datum) => {
      const {
        name,
        lat,
        long,
        [key]: val,
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

  static createLeafletMap(container) {
    const {
      ATTRIBUTION,
      TILES,
      ACCESS_TOKEN,
      POSITION,
      ID,
      MAX_ZOOM,
      MIN_ZOOM,
      TILE_SIZE,
      ZOOM_OFFSET,
      MIN_LAT,
      MAX_LAT,
      MIN_LONG,
      MAX_LONG,
    } = CONFIGS.MAP;

    const bounds = L.latLngBounds([
      [MIN_LAT, MIN_LONG],
      [MAX_LAT, MAX_LONG],
    ]);

    const map = L.map(container, { attributionControl: false });

    L
      .tileLayer(TILES, {
        attribution: ATTRIBUTION,
        accessToken: ACCESS_TOKEN,
        id: ID,
        maxZoom: MAX_ZOOM,
        minZoom: MIN_ZOOM,
        tileSize: TILE_SIZE,
        zoomOffset: ZOOM_OFFSET,
      })
      .addTo(map);

    L.control.attribution({ position: POSITION }).addTo(map);
    map.setMaxBounds(bounds);
    map.setView([25, 0], 2);

    setTimeout(() => map.invalidateSize());
    return map;
  }
}

export default Map;
