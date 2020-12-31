import { cap } from './helpers/index';

class State {
  /**
   * @param {Object} params - state params
   * @param {String} params.period - "all" or "today"
   * @param {String} params.amount - "abs" or "100k"
   * @param {String} params.status - "cases", "deaths" or "recovered"
   * @param {String} params.name - "World" or country name
   */
  constructor({
    period = 'all',
    amount = 'abs',
    status = 'cases',
    name = 'World',
  } = {}) {
    this.period = period;
    this.amount = amount;
    this.status = status;
    this.name = name;
  }

  update([key, val]) {
    this[key] = val;
  }

  getKey() {
    return `${this.period}${cap(this.status)}${this.amount === '100k' ? this.amount : ''}`;
  }

  getDescription() {
    return `${cap(this.status)} ${this.getAmountDesc()}(${this.getPeriodDesc()})`;
  }

  getAmountDesc() {
    return this.amount === '100k' ? 'per 100k ' : ' ';
  }

  getPeriodDesc() {
    return this.period === 'all' ? 'all time' : 'today';
  }
}

export default State;
