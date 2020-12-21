import './LoadingScreen.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';

class LoadingScreen extends Element {
  constructor() {
    super({ className: CLASSES.STATIC.LOADING_SCREEN });

    const featuresWrapper = Element.createDOM({ className: CLASSES.STATIC.LOADING_SCREEN_WRAPPER });
    const featuresGreeting = Element.createDOM({
      tagName: TAGS.P,
      textContent: 'Уважаемые проверяющие!',
    });
    const featuresP = Element.createDOM({
      tagName: TAGS.P,
      textContent: 'Экстра-фичи нашего проекта:',
    });
    const featuresUL = Element.createDOM({ tagName: TAGS.UL });
    const headingWrapper = Element.createDOM({
      className: CLASSES.STATIC.LOADING_SCREEN_HEADING_WRAPPER,
    });

    this.heading = Element.createDOM({
      tagName: TAGS.H2,
      textContent: 'Loading...',
    });
    this.closingButton = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: CLASSES.STATIC.LOADING_SCREEN_BUTTON,
      textContent: 'Open App',
    });

    headingWrapper.append(this.heading, this.closingButton);
    featuresWrapper.append(featuresGreeting, featuresP, featuresUL);
    this.element.append(headingWrapper, featuresWrapper);

    this.closingButton.addEventListener('click', () => {
      this.element.remove();
    });
  }

  setLoaded() {
    this.heading.textContent = 'Loading done!';
    this.element.classList.add(CLASSES.STATIC.LOADING_SCREEN__LOADED);
  }
}

export default LoadingScreen;
