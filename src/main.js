import './scss/index.scss';
import App from './js/App';
import VirtualKeyboard from './js/VirtualKeyboard';

const app = App.create(document.body);
VirtualKeyboard.create(app);
