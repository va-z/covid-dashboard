import './Loader.scss';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import Button from '../_common/Button';

class Loader extends Element {
  constructor() {
    super({ className: CLASSES.LOADER });

    const wrapper = Element.createDOM({ className: CLASSES.LOADER__WRAPPER });
    const greeting = `<p class="${CLASSES.LOADER__GREETING}">Уважаемые проверяющие! Вот экстра-фичи нашего проекта: </p>
    <ul class="${CLASSES.LOADER__LIST}">
      <li class="${CLASSES['LOADER__LIST-ITEM']}">Кнопка сохранения данных в текстовом формате</li>
      <li class="${CLASSES['LOADER__LIST-ITEM']}">Выбор страны по клику на кружочек карты</li>
      <li class="${CLASSES['LOADER__LIST-ITEM']}">Разноцветные кружки для разных случаев заболевания</li>
      <li class="${CLASSES['LOADER__LIST-ITEM']}">Этот экран-заглушка на время загрузки данных :)</li>
    </ul>`;
    const headingWrapper = Element.createDOM({
      className: CLASSES['LOADER__HEADING-WRAPPER'],
    });

    this.heading = Element.createDOM({
      tagName: TAGS.H2,
      textContent: 'Loading...',
    });
    this.buttonClose = Button.createDOM({
      className: `${CLASSES.BUTTON} ${CLASSES.LOADER__BUTTON}`,
      textContent: 'Open App',
    });

    headingWrapper.append(this.heading, this.buttonClose);
    wrapper.append(headingWrapper);
    wrapper.insertAdjacentHTML('beforeend', greeting);
    this.element.append(wrapper);

    this.buttonClose.addEventListener('click', () => { this.element.remove(); });
  }

  setLoaded() {
    this.heading.textContent = 'Loading done!';
    this.element.classList.add(CLASSES['LOADER--LOADED']);
  }
}

export default Loader;
