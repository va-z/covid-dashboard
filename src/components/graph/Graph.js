import './Graph.scss';
import Chart from 'chart.js';
import { TAGS, CLASSES } from '../../js/constants/index';
import Element from '../_common/Element';
import FullscreenContainer from '../_common/fullscreenContainer/FullscreenContainer';
import Toggle from '../_common/toggle/Toggle';
import Tabs from '../_common/tabs/Tabs';

class Graph extends FullscreenContainer {
  constructor() {
    super();
    this.addClasses(CLASSES.GRAPH.GRAPH);

    this.title = Element.createDOM({
      tagName: TAGS.H2,
      className: CLASSES.GRAPH.GRAPH_TITLE,
      textContent: 'Global/Country',
    });

    const graphContainer = Element.createDOM({
      className: 'graph__container',
    });

    const graph = Element.createDOM({
      tagName: 'canvas',
      className: CLASSES.GRAPH.GRAPH_BLOCK,
      attrs: [
        ['width', '10'],
        ['height', '15'],
      ],
    });

    this.ctx = graph.getContext('2d');

    this.togglesContainer = Element.createDOM({
      className: CLASSES.STATIC.TOGGLES_CONTAINER,
    });

    this.togglePeriod = new Toggle({
      type: 'period',
      btnTitles: ['total', 'daily'],
    });

    this.toggleAmount = new Toggle({
      type: 'amount',
      btnTitles: ['abs', 'per 100K'],
    });

    this.tabs = new Tabs();

    this.controls = [
      this.togglePeriod,
      this.toggleAmount,
      this.tabs,
    ];

    this.togglesContainer.append(
      this.togglePeriod.element,
      this.toggleAmount.element,
    );

    graphContainer.append(graph);
    this.element.append(
      this.title,
      graphContainer,
      this.togglesContainer,
      this.tabs.element,
    );

    this.element.addEventListener('fullscreenSet', () => {
      const isFullscreen = this.element.classList.contains('fullscreen--active');
      graphContainer.style.height = '0px';

      setTimeout(() => {
        if (isFullscreen) {
          const height = `${this.element.offsetHeight - 30}px`;
          graphContainer.style.height = height;
        } else {
          graphContainer.style.height = '';
        }
      }, 10);
    });
  }

  update({ state, data, change }) {
    if (change) {
      this.controls.forEach((control) => {
        control.update(state);
      });
    }

    this.title.textContent = state.name;

    if (!this.myChart) {
      this.myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              },
            }],
          },
        },
      });
    }
  }
}

export default Graph;
