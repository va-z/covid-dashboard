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
          graphContainer.style.height = `${this.element.offsetHeight - 100}px`;
          graphContainer.style.width = '';
        } else {
          graphContainer.style.height = '';
          graphContainer.style.width = '';
        }
      }, 25);
    });
  }

  update({ state, data, change }) {
    if (change) {
      this.controls.forEach((control) => {
        control.update(state);
      });
    }

    this.title.textContent = state.name;

    const obj = data.find((datum) => datum.name === state.name);
    const key = state.getKey();
    const dataset = obj.historic[key];
    const { dates } = obj.historic;

    if (!this.myChart) {
      this.myChart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [{
            label: state.getDescription(),
            data: dataset,
            backgroundColor: Graph.getColor(state.status),
          }],
        },
        options: {
          tooltips: {
            callbacks: {
              title: (item) => item[0].xLabel.split(',').slice(0, 2).join(', '),
            },
          },
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                callback: (value) => value.toLocaleString('ru-RU'),
              },
            }],
            xAxes: [{
              type: 'time',
              time: {
                unit: 'month',
              },
            }],
          },
        },
      });
    } else {
      this.myChart.data.datasets[0] = {
        backgroundColor: Graph.getColor(state.status),
        data: dataset,
        label: state.getDescription(),
      };
      this.myChart.update();
    }
  }

  static getColor(status) {
    const colors = {
      cases: 'yellow',
      deaths: 'red',
      recovered: '#4e0',
    };

    return colors[status];
  }
}

export default Graph;
