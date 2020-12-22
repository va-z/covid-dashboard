import './scss/index.scss';
import 'simple-keyboard/build/css/index.css';
import Keyboard from 'simple-keyboard';
import Element from './components/_common/Element';
import App from './js/App';

const app = App.create(document.body);

const keyboardContainer = Element.createDOM({
  tagName: 'div',
  className: 'simple-keyboard',
});

app.view.element.append(keyboardContainer);

function onChange(input) {
  document.querySelector('.input').value = input;
  console.log('Input changed', input);
}

function onKeyPress(button) {
  console.log('Button pressed', button);
}

// const keyboard = new Keyboard({
//   onChange: (input) => onChange(input),
//   onKeyPress: (button) => onKeyPress(button),
// });
