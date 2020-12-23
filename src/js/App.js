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

    this.view.header.button.addEventListener('click', () => {
      const link = document.createElement('a');
      const { name } = this.state;
      const obj = this.data.filter((datum) => datum.name === name)[0];
      const file = new Blob([JSON.stringify(obj)], { type: 'text/plain' });

      link.download = `${name}data.json`;
      link.href = URL.createObjectURL(file);
      link.click();

      link.remove();
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
