import View from '../components/view/View';

class App {
  constructor(parent, data) {
    this.state = {};
    this.view = new View(parent, data);

    this.view.element.addEventListener('updateRequest', () => {
      // add updateState method that modifies this.state according to event.details
      this.view.element.update(this.state, data);
    });
  }

  static create(parent, data) {
    return new App(parent, data);
  }
}

export default App;
