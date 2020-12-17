import './Graph.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';

class Graph extends FullscreenContainer {
  constructor() {
    super({ className: CLASSES.GRAPH.GRAPH });

    const text = Element.createDOM({
      tagName: TAGS.SPAN,
      textContent: 'Placeholder',
    });

    this.element.append(text);
  }
}

export default Graph;
