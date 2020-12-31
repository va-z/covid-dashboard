import { NUMBERS } from '../constants/index';

function formatNumber(num) {
  if (num >= NUMBERS.MILLION) {
    const [int, float] = String(num / NUMBERS.MILLION).split('.');
    return `${int.toLocaleString('ru-RU')}.${float ? float.slice(0, 1) : '0'}M`;
  } if (num >= NUMBERS.THOUSAND) {
    const [int, float] = String(num / NUMBERS.THOUSAND).split('.');
    return `${int.toLocaleString('ru-RU')}.${float ? float.slice(0, 1) : '0'}K`;
  }
  return num.toLocaleString('ru-RU');
}

export default formatNumber;
