import './Map.scss';
import { CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Tabs from '../_common/tabs/Tabs';

class Map extends FullscreenContainer {
  constructor() {
    super();
    this.addClasses(CLASSES.MAP.MAP);

    const wrapper = Element.createDOM({
      className: 'map-container svg-container',
      attrs: [
        ['id', 'mapId'],
      ],
    });

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
