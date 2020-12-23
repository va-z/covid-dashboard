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
    result += this.amount === '100k' ? this.amount : '';

    return result;
  }

  getDescription() {
    const getFigureStr = (str) => (str === 'all' ? 'all time' : 'today');
    const getAmountStr = (str) => (str === '100k' ? 'per 100k ' : ' ');
    return `${cap(this.status)} ${getAmountStr(this.amount)}(${getFigureStr(this.figure)})`;
  }

  update(params) {
    const [key, val] = Object.entries(params)[0];
    this[key] = val;
  }
}

export default State;
