import './Map.scss';
import { CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Tabs from '../_common/tabs/Tabs';

class Map extends FullscreenContainer {
  constructor() {
    super({ className: CLASSES.MAP.MAP });

    this.mapContainer = Element.createDOM({
      className: CLASSES.MAP_BLOCK,
      textContent: 'The map will be here',
    });

    this.tabs = Tabs.createDOM({
      btnIndexes: ['total', 'recovery', 'deaths'],
      btnTitles: ['Total', 'Recovery', 'Deaths'],
    });

    this.element.append(this.mapContainer, this.tabs);
  }
}

export default Map;
