import { capitalizeFirstLetter } from '../helpers/index';
import {
  createTemplate,
  addLastValues,
  pushToHistoric,
} from './_helpers';

function processData(last, timeline, population) {
  const timelineEntries = Object.entries(timeline);
  const typesAmount = timelineEntries.length;
  const lastDate = new Date(last.updated).getDate();
  const result = createTemplate();

  for (let i = 0; i < typesAmount; i += 1) {
    const [type, dates] = timelineEntries[i];
    const typeInKey = capitalizeFirstLetter(type);
    const datesEntries = Object.entries(dates);
    const daysAmount = datesEntries.length;

    for (let j = 0; j < daysAmount; j += 1) {
      const histObj = result.historic;
      const date = datesEntries[j][0];
      const value = datesEntries[j][1];
      const dailyValue = value - (datesEntries[j - 1]?.[1] ?? 0);

      if (histObj.dates.length < daysAmount) {
        histObj.dates.push(new Date(date));
      }

      pushToHistoric(histObj, typeInKey, value, dailyValue, population);

      if (j === daysAmount - 1) {
        const lastHistoricDate = new Date(date).getDate();

        if (lastDate !== lastHistoricDate) {
          if (i === 0) {
            const d = new Date(last.updated).setHours(0, 0, 0, 0);
            histObj.dates.push(d);
          }

          pushToHistoric(histObj, typeInKey, value, dailyValue, population);
        }
      }
    }

    addLastValues(result, type, typeInKey, last, population);
  }

  return result;
}

export default processData;
