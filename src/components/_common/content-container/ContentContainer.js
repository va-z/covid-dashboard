import './ContentContainer.scss';
import { TAGS, CLASSES } from '../../../js/constants/index';
import Element from '../Element';

class ContentContainer extends Element {
  constructor({ className }) {
    super({ tagName: TAGS.SECTION, className: CLASSES.CONTENT_CONTAINER });
    this.addClasses(className);

    const buttonFullscreen = Element.createDOM({
      tagName: TAGS.BUTTON,
      className: CLASSES.CONTENT_CONTAINER_FULLSCREEN_BUTTON,
    });

    this.element.append(buttonFullscreen);

    buttonFullscreen.addEventListener('click', () => {
      if (!this.element.classList.contains(CLASSES.GRAPH)) {
        this.element.classList.toggle(CLASSES.CONTENT_CONTAINER_FULLSCREEN);
      } else {
        setTimeout(() => {
          this.element.classList.toggle(CLASSES.CONTENT_CONTAINER_FULLSCREEN);
        });
      }

      ContentContainer.fireEvent({
        dispatcher: buttonFullscreen,
        name: 'fullscreenSet',
        bubbles: true,
      });
    });
  }
}

export default ContentContainer;
