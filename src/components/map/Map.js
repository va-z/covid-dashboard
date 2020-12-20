import './Map.scss';
import { CLASSES } from '../../js/constants/index';
import SVGWrapper from '../_common/SVGWrapper/SVGWrapper';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Tabs from '../_common/tabs/Tabs';

class Map extends FullscreenContainer {
  constructor() {
    super({ className: CLASSES.MAP.MAP });

    const wrapper = SVGWrapper.createDOM({
      className: CLASSES.MAP.MAP_BLOCK,
      attrs: [
        ['width', '960'],
        ['height', '600'],
      ],
    });

    this.tabs = Tabs.createDOM({
      btnIndexes: ['total', 'recovery', 'deaths'],
      btnTitles: ['Total', 'Recovery', 'Deaths'],
    });

    this.element.append(wrapper, this.tabs);
  }
}

export default Map;
