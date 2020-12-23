import './Map.scss';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Tabs from '../_common/tabs/Tabs';

class Map extends FullscreenContainer {
  constructor() {
    super();
    this.addClasses(CLASSES.MAP.MAP);

    const wrapper = Element.createDOM({
      className: 'map-container',
    });

    this.map = L.map(wrapper);
    this.map.setView([51.505, -0.09], 3);
    const attribution = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    const tiles = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png';
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

    setTimeout(() => this.map.invalidateSize(), 500);

    this.tabs = new Tabs();
    this.element.append(wrapper, this.tabs.element);
  }

  update({ state, data, change }) {
    if (change) {
      this.tabs.update(state);
    }
  }
}

export default Map;
