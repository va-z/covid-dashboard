import '../scss/index.scss';
import URLS from './data/URLS';
import getData from './data/getData';
import State from './State';
import View from '../components/view/View';

class App {
  constructor(parent) {
    this.state = new State();
    this.view = new View(parent);
    this.setData(URLS);

    this.view.element.addEventListener('updateRequest', (event) => {
      const change = event.detail;
      this.state.update(change);

      this.view.update({
        data: this.data,
        updateTimestamp: this.updateTimestamp,
        state: this.state,
        change,
      });
    });
  }

  async setData(url) {
    const data = await getData(url);
    this.data = data.data;
    this.updateTimestamp = data.updateTimestamp;

    this.view.init({
      data: this.data,
      updateTimestamp: this.updateTimestamp,
      state: this.state,
    });
  }

  static create(parent) {
    return new App(parent);
  }
}

export default App;
