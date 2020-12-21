import './Map.scss';
import { CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Tabs from '../_common/tabs/Tabs';

class Map extends FullscreenContainer {
  constructor() {
    super();
    this.addClasses(CLASSES.MAP.MAP);

    const wrapper = Element.createDOM({ className: 'map-container' });

    this.tabs = Tabs.createDOM();
    this.element.append(wrapper, this.tabs);
  }

  update() {
    console.log(this);
  }
}

export default Map;
