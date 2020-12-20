import { STRINGS, NUMBERS } from '../constants/index';
import storage from '../helpers/storage';
import fetchData from './_fetchData';

async function getRawData(urls) {
  const lastUpdate = storage.get(STRINGS.KEY);
  const lastTimestamp = lastUpdate?.[0].updated;
  const newTimestamp = Date.now();
  const threshold = NUMBERS.MS_IN_SS * NUMBERS.SS_IN_MM * NUMBERS.MM_IN_HH * NUMBERS.SIX;
  const isUpdateRequired = !lastTimestamp || ((newTimestamp - lastTimestamp) > threshold);

  if (isUpdateRequired) {
    const data = await fetchData(urls);
    storage.clear();

    try {
      storage.set(STRINGS.KEY, data);
    } catch (err) {
      return data;
    }

    return data;
  }

  return lastUpdate;
}

export default getRawData;
