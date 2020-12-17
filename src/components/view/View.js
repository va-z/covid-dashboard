import './View.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import Header from '../header/Header';
import Search from '../search/Search';
import Map from '../map/Map';
import Table from '../table/Table';
import Graph from '../graph/Graph';
import Footer from '../footer/Footer';

class View extends Element {
  constructor(parent) {
    super({ tagName: TAGS.DIV, className: CLASSES.STATIC.VIEW });

    const mainWrapper = Element.createDOM({ tagName: TAGS.MAIN });

    this.header = new Header();
    this.search = new Search();
    this.map = new Map();
    this.table = new Table();
    this.graph = new Graph();
    this.footer = new Footer();

    mainWrapper.append(
      this.search.element,
      this.map.element,
      this.table.element,
      this.graph.element,
    );
    this.element.append(this.header.element, mainWrapper, this.footer.element);

    /* Prepend this.element after appending all contents */
    parent.insertAdjacentElement('afterbegin', this.element);
  }
}

export default View;
