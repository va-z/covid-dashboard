import '../scss/index.scss';
import URLS from './data/URLS';
import getData from './data/getData';
import View from '../components/view/View';

class App {
  constructor(parent) {
    this.state = {
      amount: 'abs', /* or per100k */
      figure: 'total', /* or today */
      param: 'recovered', /* or cases, deaths */
      name: 'World', /* or Country Name */
    };

    this.setData(URLS);
    this.view = new View(parent);

    this.view.element.addEventListener('updateRequest', () => {
      this.view.element.update(this.state, this.data);
    });
  }

  async setData(url) {
    const data = await getData(url);
    this.data = data.data;
    this.updateTimestamp = data.updateTimestamp;
    // this.view.removeLoadingScreen();
  }

  static create(parent) {
    return new App(parent);
  }
}

export default App;
