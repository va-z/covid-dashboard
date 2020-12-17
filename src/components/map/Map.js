import './Map.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';

class Map extends FullscreenContainer {
  constructor() {
    super({ className: CLASSES.MAP.MAP });

    const text = Element.createDOM({
      tagName: TAGS.SPAN,
      textContent: 'Placeholder',
    });

    this.element.append(text);
  }
}

export default Map;
