import 'simple-keyboard/build/css/index.css';
import Keyboard from 'simple-keyboard';

class VirtualKeyboard {
  constructor(host) {
    this.inputInstance = host.view.search.searchInput;
    this.inputElem = host.view.element.querySelector('#input');
    this.keyboardContainer = host.view.keyboardContainer;

    this.keyboard = new Keyboard({
      physicalKeyboardHighlight: true,
      layout: {
        default: [
          'q w e r t y u i o p {close}',
          'a s d f g h j k l {bksp}',
          'z x c v b n m {shift}',
          '{space} {enter}',
        ],
        shift: [
          'Q W E R T Y U I O P {close}',
          'A S D F G H J K L {bksp}',
          'Z X C V B N M {shift}',
          '{space} {enter}',
        ],
      },
      mergeDisplay: true,
      display: {
        '{close}': '[X]',
        '{del}': 'del',
      },

      onChange: (input) => this.onChange(input),
      onKeyPress: (button) => this.onKeyPress(button),
    });

    this.inputElem.addEventListener('focus', () => {
      this.keyboardContainer.style.display = 'block';
    });

    this.inputElem.addEventListener('input', (event) => {
      this.keyboard.setInput(event.target.value);
    });
  }

  onChange(input) {
    this.inputElem.value = input;
    setTimeout(() => {
      this.inputElem.focus();
    }, 10);
  }

  onKeyPress(button) {
    if (button === '{shift}') {
      this.handleShift();
    } else if (button === '{close}') {
      this.keyboardContainer.style.display = '';
    } else if (button === '{enter}') {
      this.inputInstance.handleEnter();
    }
  }

  handleShift() {
    const currentLayout = this.keyboard.options.layoutName;
    const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

    this.keyboard.setOptions({
      layoutName: shiftToggle,
    });
  }

  static create(host) {
    return new VirtualKeyboard(host);
  }
}

export default VirtualKeyboard;
