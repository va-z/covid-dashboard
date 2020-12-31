import { CONFIGS } from '../constants/index';

function toNamelessString(num) {
  const [intVal, floatVal] = String(num).split('.');
  const intStr = intVal.toLocaleString(CONFIGS.LOCALE);
  const floatStr = floatVal ? floatVal.slice(0, 1) : '0';

  return `${intStr}.${floatStr}`;
}

function toNamedString(num) {
  const MILLION = 1_000_000;
  const THOUSAND = 1_000;

  if (num >= MILLION) {
    return `${toNamelessString(num / MILLION)}M`;
  }

  if (num >= THOUSAND) {
    return `${toNamelessString(num / THOUSAND)}K`;
  }

  return toNamelessString(num);
}

function toPixelString(num) {
  return `${parseInt(num, 10)}px`;
}

export default {
  toNamelessString,
  toNamedString,
  toPixelString,
};
