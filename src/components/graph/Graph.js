import './Graph.scss';
import Chart from 'chart.js';
import { formatNumber, getMarkerColor } from '../../js/helpers/index';
import { TAGS, CLASSES, CONFIGS } from '../../js/constants/index';
import Element from '../_common/Element';
import ContentContainer from '../_common/content-container/ContentContainer';
import ControlsToggles from '../_common/controls-toggles/ControlsToggles';
import ControlsTabs from '../_common/controls-tabs/ControlsTabs';

class Graph extends ContentContainer {
  constructor({ blockClassName }) {
    super({ className: CLASSES.GRAPH });
    this.addClasses(blockClassName);

    const graphContainer = Element.createDOM({ className: CLASSES.GRAPH__CONTAINER });
    const graph = Element.createDOM({
      tagName: 'canvas',
      className: CLASSES.GRAPH__BLOCK,
      attrs: [
        ['width', CONFIGS.GRAPH.CTX_WIDTH],
        ['height', CONFIGS.GRAPH.CTX_HEIGHT],
      ],
    });

    this.ctx = graph.getContext('2d');
    this.title = Element.createDOM({
      tagName: TAGS.H2,
      className: CLASSES.GRAPH__TITLE,
    });

    this.toggles = new ControlsToggles({ hostClassName: CLASSES.GRAPH });
    this.tabs = new ControlsTabs({ hostClassName: CLASSES.GRAPH });

    graphContainer.append(graph);
    this.element.append(
      this.title,
      graphContainer,
      this.toggles.element,
      this.tabs.element,
    );

    this.element.addEventListener('fullscreenSet', () => {
      const isFullscreen = this.element.classList.contains('fullscreen--active');
      graphContainer.style.width = '1px';
      graphContainer.style.height = '1px';

      setTimeout(() => {
        if (isFullscreen) {
          graphContainer.style.width = '';
          graphContainer.style.height = `${this.element.offsetHeight - 100}px`;
        } else {
          graphContainer.style.height = '';
          graphContainer.style.width = '';
        }
      });
    });
  }

  update({ state, data }) {
    this.toggles.update(state);
    this.tabs.update(state);

    this.title.textContent = state.name;

    const obj = data.find((datum) => datum.name === state.name);
    const key = state.getKey();
    const dataset = obj.historic[key];
    const { dates } = obj.historic;

    if (!this.chart) {
      this.chart = new Chart(this.ctx, {
        type: 'bar',
        data: {
          labels: dates,
          datasets: [{
            label: state.getDescription(),
            data: dataset,
            backgroundColor: getMarkerColor(state.status),
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
                callback: formatNumber,
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

      return;
    }

    this.chart.data.datasets[0] = {
      backgroundColor: getMarkerColor(state.status, false),
      data: dataset,
      label: state.getDescription(),
    };
    this.chart.update();
  }
}

export default Graph;
