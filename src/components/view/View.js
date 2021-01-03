import './View.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import Loader from '../loader/Loader';
import Header from '../header/Header';
import Search from '../search/Search';
import Map from '../map/Map';
import Table from '../table/Table';
import Graph from '../graph/Graph';
import Footer from '../footer/Footer';

class View extends Element {
  constructor(parent) {
    super({ className: CLASSES.VIEW });

    const mainWrapper = Element.createDOM({
      tagName: TAGS.MAIN,
      className: CLASSES.VIEW_MAIN_WRAPPER,
    });

    this.loader = new Loader();
    this.header = new Header({ blockClassName: CLASSES.VIEW_HEADER });
    this.search = new Search({ blockClassName: CLASSES.VIEW_SEARCH });
    this.map = new Map({ blockClassName: CLASSES.VIEW_MAP });
    this.table = new Table({ blockClassName: CLASSES.VIEW_TABLE });
    this.graph = new Graph({ blockClassName: CLASSES.VIEW_GRAPH });
    this.footer = new Footer({ blockClassName: CLASSES.VIEW_FOOTER });
    this.keyboardContainer = Element.createDOM({ className: CLASSES.SIMPLE_KEYBOARD });

    mainWrapper.append(
      this.search.element,
      this.map.element,
      this.table.element,
      this.graph.element,
    );

    this.dataBlocks = [
      this.header,
      this.search,
      this.map,
      this.table,
      this.graph,
    ];

    this.element.append(
      this.loader.element,
      this.header.element,
      mainWrapper,
      this.footer.element,
      this.keyboardContainer,
    );

    parent.insertAdjacentElement('afterbegin', this.element);
  }

  init(params) {
    this.loader.setLoaded();
    this.update(params);
  }

  /**
   * @param {Object} params - object of parameters
   * @param {Number} params.updateTimestamp - timestamp of the last update received from the server
   * @param {Array} params.data - data array
   * @param {Object} params.state - the state of the App
   * @param {Object} params.change - param changed in previous update request
   */
  update(params) {
    this.dataBlocks.forEach((block) => {
      block.update(params);
    });
  }
}

export default View;
