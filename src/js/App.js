import URLS from './data/URLS';
// import getData from './data/getData';
import View from '../components/view/View';
import dummy from './data/dummy.json';

class App {
  constructor(parent, data) {
    this.setData(URLS);
    this.state = {
      amount: 'abs', /* or per100k */
      figure: 'total', /* or daily */
      param: 'recovered', /* or cases, deaths */
      name: 'World', /* or Country Name */
    };
    this.view = new View(parent);

    this.view.element.addEventListener('updateRequest', () => {
      // add updateState method that modifies this.state according to event.details
      this.view.element.update(this.state, data);
    });
  }

  async setData(/* url */) {
    // this.data = await getData(url);
    // this.view.removeLoaders();
    this.data = dummy;
  }

  static create(parent, data) {
    return new App(parent, data);
  }
}

export default App;
