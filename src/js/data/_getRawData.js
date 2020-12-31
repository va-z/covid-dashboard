import { NUMBERS, CONFIGS } from '../constants/index';
import { storage } from '../helpers/index';
import fetchData from './_fetchData';

const { STORAGE_KEY } = CONFIGS;

async function getRawData(urls) {
  const lastUpdate = storage.get(STORAGE_KEY);
  const lastTimestamp = lastUpdate?.[0].updated;
  const newTimestamp = Date.now();
  const threshold = NUMBERS.MS_IN_SS * NUMBERS.SS_IN_MM * NUMBERS.MM_IN_HH * NUMBERS.SIX;
  const isUpdateRequired = !lastTimestamp || ((newTimestamp - lastTimestamp) > threshold);

  if (isUpdateRequired) {
    const data = await fetchData(urls);
    storage.clear();

    try {
      storage.set(STORAGE_KEY, data);
    } catch (err) {
      return data;
    }

    return data;
  }

  return lastUpdate;
}

export default getRawData;
