import cap from './helpers/cap';

class State {
  /**
   * @param {Object} params - state params
   * @param {String} params.figure - "all" or "today"
   * @param {String} params.amount - "abs" or "100k"
   * @param {String} params.status - "cases", "deaths" or "recovered"
   * @param {String} params.name - "World" or country name
   */
  constructor({
    figure = 'all',
    amount = 'abs',
    status = 'cases',
    name = 'World',
  } = {}) {
    this.figure = figure;
    this.amount = amount;
    this.status = status;
    this.name = name;
  }

  getKey() {
    let result = '';

    result += this.figure;
    result += cap(this.status);
    result += this.amount === 'per100k' ? this.amount : '';

    return result;
  }
}

export default State;
