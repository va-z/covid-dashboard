import './LoadingScreen.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';

class LoadingScreen extends Element {
  constructor() {
    super({ className: CLASSES.STATIC.LOADING_SCREEN });

    const featuresWrapper = Element.createDOM({ className: CLASSES.STATIC.LOADING_SCREEN_WRAPPER });
    const featuresGreeting = Element.createDOM({
      tagName: TAGS.P,
      className: 'loading-screen__p',
      textContent: 'Уважаемые проверяющие!',
    });
    const featuresP = Element.createDOM({
      tagName: TAGS.P,
      className: 'loading-screen__p',
      textContent: 'Экстра-фичи нашего проекта:',
    });
    const featuresUL = Element.createDOM({ tagName: TAGS.UL });
    const featuresLI1 = Element.createDOM({
      tagName: TAGS.LI,
      textContent: 'Кнопка сохранения данных в текстовом формате',
    });
    const featuresLI2 = Element.createDOM({
      tagName: TAGS.LI,
      textContent: 'Выбор страны по клику на кружочек карты',
    });
    const featuresLI3 = Element.createDOM({
      tagName: TAGS.LI,
      textContent: 'Разноцветные кружки для разных случаев заболевания',
    });
    const featuresLI4 = Element.createDOM({
      tagName: TAGS.LI,
      textContent: 'Этот экран-заглушка на время загрузки данных :)',
    });
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
    featuresUL.append(featuresLI1, featuresLI2, featuresLI3, featuresLI4);
    featuresWrapper.append(
      featuresGreeting,
      featuresP,
      featuresUL,
    );
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
