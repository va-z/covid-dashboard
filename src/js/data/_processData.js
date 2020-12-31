import { capitalizeFirstLetter } from '../helpers/index';
import {
  createTemplate,
  amountRelativeToPopulation,
  toHist,
  noSubZero,
} from './_helpers';

function processData(last, timeline, pop) {
  const timelineEntries = Object.entries(timeline);
  const TYPES_AMOUNT = timelineEntries.length;
  const result = createTemplate();
  const lastDate = new Date(last.updated).getDate();

  for (let i = 0; i < TYPES_AMOUNT; i += 1) {
    const [type, dates] = timelineEntries[i];
    const datesEntries = Object.entries(dates);
    const DAYS_AMOUNT = datesEntries.length;
    const typeInKey = capitalizeFirstLetter(type);

    for (let j = 0; j < DAYS_AMOUNT; j += 1) {
      const histObj = result.historic;
      const date = datesEntries[j][0];
      const value = noSubZero(datesEntries[j][1]);
      const dailyValue = noSubZero(value - (datesEntries[j - 1]?.[1] ?? 0));

      if (histObj.dates.length < DAYS_AMOUNT) {
        histObj.dates.push(new Date(date));
      }

      toHist(histObj, type, value, dailyValue, pop);

      if (j === DAYS_AMOUNT - 1) {
        const lastHistoricDate = new Date(date).getDate();

        if (lastDate !== lastHistoricDate) {
          if (i === 0) {
            histObj.dates.push(new Date(last.updated));
          }

          toHist(histObj, type, value, dailyValue, pop);
        }
      }
    }

    const histArr = result.historic[`all${typeInKey}`];
    const lastHistoricValue = histArr[histArr.length - 1];
    const allValue = last[type];
    const todayValue = last[`today${typeInKey}`];

    result[`today${typeInKey}`] = todayValue;
    result[`today${typeInKey}100k`] = amountRelativeToPopulation(todayValue, pop);
    result[`all${typeInKey}`] = allValue || lastHistoricValue;
    result[`all${typeInKey}100k`] = amountRelativeToPopulation(allValue || lastHistoricValue, pop);
  }

  return result;
}

export default processData;
