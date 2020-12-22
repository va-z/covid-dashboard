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

    this.title = Element.createDOM({
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

    this.togglePeriod = new Toggle({
      type: 'period',
      btnTitles: ['total', 'daily'],
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

    this.togglesContainer.append(
      this.togglePeriod.element,
      this.toggleAmount.element,
    );

    this.element.append(
      this.title,
      this.graph,
      this.togglesContainer,
      this.tabs.element,
    );
  }

  update({ state, data, change }) {
    if (change) {
      this.controls.forEach((control) => {
        control.update(state);
      });
    }

    this.title.textContent = state.name;
  }
}

export default Graph;
