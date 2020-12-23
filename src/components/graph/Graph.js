import './Graph.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Toggle from '../_common/toggle/Toggle';
import Tabs from '../_common/tabs/Tabs';

class Graph extends FullscreenContainer {
  constructor() {
    super();
    this.addClasses(CLASSES.GRAPH.GRAPH);

    const title = Element.createDOM({
      tagName: TAGS.H2,
      className: CLASSES.GRAPH.GRAPH_TITLE,
      textContent: 'Global/Country',
    });

    this.graph = Element.createDOM({
      className: CLASSES.GRAPH.GRAPH_BLOCK,
    });

    this.togglesContainer = Element.createDOM({
      className: CLASSES.STATIC.TOGGLES_CONTAINER,
    });

    this.togglePeriod = Toggle.createDOM({
      type: 'period',
      btnTitles: ['total', 'daily'],
    });

    this.toggleAmount = Toggle.createDOM({
      type: 'amount',
      btnTitles: ['abs', 'per 100K'],
    });

    this.tabs = Tabs.createDOM();

    this.togglesContainer.append(this.togglePeriod, this.toggleAmount);
    this.element.append(title, this.graph, this.togglesContainer, this.tabs);
  }

  update() {
    console.log(this);
  }

  getSize() {
    const size = { height: 200, width: 274 };

    if (this.element.classList.contains('fullscreen--active')) {
      size.height = this.element.clientHeight - 100;
      size.width = this.element.clientWidth - 26;
    } else {
      size.height = 200;
      size.width = 274;
    }
    return size;
  }
}

export default Graph;
