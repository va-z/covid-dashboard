import '../scss/index.scss';
import URLS from './data/URLS';
import getData from './data/getData';
import View from '../components/view/View';

class App {
  constructor(parent) {
    const data = App.setData(URLS);

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

  static async setData(url) {
    const data = await getData(url);
    // this.view.removeLoaders();

    return data;
  }

  static create(parent) {
    return new App(parent);
  }
}

export default App;
