import './View.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import LoadingScreen from '../loading-screen/LoadingScreen';
import Header from '../header/Header';
import Search from '../search/Search';
import Map from '../map/Map';
import Table from '../table/Table';
import Graph from '../graph/Graph';
import Footer from '../footer/Footer';
import graphDraw from '../../js/graphDraw';

class View extends Element {
  constructor(parent) {
    super({ tagName: TAGS.DIV, className: CLASSES.STATIC.VIEW });

    const mainWrapper = Element.createDOM({ tagName: TAGS.MAIN });
    const wrapper = Element.createDOM({
      className: `${CLASSES.STATIC.CONTENT_WRAPPER} ${CLASSES.STATIC['CONTENT_WRAPPER-MAIN']}`,
    });

    this.loadingScreen = new LoadingScreen();
    this.header = new Header();
    this.search = new Search();
    this.map = new Map();
    this.table = new Table();
    this.graph = new Graph();
    this.footer = new Footer();

    this.keyboardContainer = Element.createDOM({
      className: 'simple-keyboard',
    });

    this.dataBlocks = [
      this.header,
      this.search,
      this.map,
      this.table,
      this.graph,
    ];

    wrapper.append(
      this.search.element,
      this.map.element,
      this.table.element,
      this.graph.element,
    );

    mainWrapper.append(wrapper);
    this.element.append(
      this.loadingScreen.element,
      this.header.element,
      mainWrapper,
      this.footer.element,
      this.keyboardContainer,
    );

    parent.insertAdjacentElement('afterbegin', this.element);
    this.size = this.graph.getSize();
  }

  init(params) {
    this.loadingScreen.setLoaded();
    this.update(params);

    this.graphResizeBtn = this.graph.fullscreenButton;
    this.graphResizeBtn.addEventListener('click', () => {
      this.size = this.graph.getSize();
      graphDraw(params.data, params.state, this.size);
    });
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
    graphDraw(params.data, params.state, this.size);
  }
}

export default View;
