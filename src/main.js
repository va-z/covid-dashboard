import './scss/index.scss';
import 'simple-keyboard/build/css/index.css';
import Keyboard from 'simple-keyboard';
import App from './js/App';

const app = App.create(document.body);

const inputElem = app.view.element.querySelector('#input');
const { keyboardContainer } = app.view;

const keyboard = new Keyboard({
  physicalKeyboardHighlight: true,
  onChange: (input) => onChange(input),
  onKeyPress: (button) => onKeyPress(button),
});

inputElem.addEventListener('focus', () => {
  keyboardContainer.style.display = 'block';
});

/**
 * Update simple-keyboard when input is changed directly
 */
inputElem.addEventListener('input', (event) => {
  keyboard.setInput(event.target.value);
});

console.log(keyboard);

function onChange(input) {
  inputElem.value = input;
  console.log('Input changed', input);
}

function onKeyPress(button) {
  console.log('Button pressed', button);

  /**
   * If you want to handle the shift and caps lock buttons
   */
  if (button === '{shift}' || button === '{lock}') handleShift();
}

function handleShift() {
  const currentLayout = keyboard.options.layoutName;
  const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

  keyboard.setOptions({
    layoutName: shiftToggle,
  });
}
