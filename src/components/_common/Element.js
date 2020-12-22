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

    if (textContent) {
      this.element.textContent = textContent;
    }
  }

  addClasses(str) {
    if (str) {
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

  static sendUpdateRequest(dispatcher, key, value) {
    const customEvent = new CustomEvent('updateRequest', {
      bubbles: true,
      detail: {
        [key]: value,
      },
    });

    dispatcher.dispatchEvent(customEvent);
  }
}

export default Element;
