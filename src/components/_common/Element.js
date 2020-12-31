import { TAGS } from '../../js/constants/index';

class Element {
  /**
   * @param {Object} params - an object with instance params
   * @param {String} params.tagName - name of created HTML Element
   * @param {String} params.className - a space-delimited string of CSS classes
   * @param {Array<Array<String>>} params.textContent - an array of ["attr", "value"] pairs
   */
  constructor({
    tagName = TAGS.DIV,
    className = null,
    textContent = null,
    attrs = null,
  } = {}) {
    this.element = document.createElement(tagName);
    this.addClasses(className);
    this.addAttrs(attrs);

    if (textContent !== null) {
      this.element.textContent = textContent;
    }
  }

  addClasses(str) {
    if (str !== null) {
      this.element.classList.add(...str.split(' '));
    }
  }

  addAttrs(arr) {
    if (arr) {
      arr.forEach(([attr, val]) => {
        this.element.setAttribute(attr, val ?? '');
      });
    }
  }

  /**
   * @param {Object} params - an object with instance params
   * @param {String} params.tagName - name of created HTML Element
   * @param {String} params.className - a space-delimited string of CSS classes
   * @param {Array<Array<String>>} params.textContent - an array of ["attr", "value"] pairs
   */
  static createDOM(params) {
    return new this(params).element;
  }

  /**
   * @param {Object} params
   * @param {HTMLElement} params.dispatcher
   * @param {String} params.name
   * @param {Boolean} params.bubbles
   * @param {Object} params.detail
   */
  static fireEvent({
    dispatcher,
    name,
    bubbles,
    detail = {},
  }) {
    const event = new CustomEvent(name, { bubbles, detail });
    dispatcher.dispatchEvent(event);
  }
}

export default Element;
