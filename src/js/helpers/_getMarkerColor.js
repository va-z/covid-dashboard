import { CONFIGS } from '../constants/index';

/**
 * @param {String} status - "cases", "deaths" or "recovered"
 * @param {Boolean} isTransparent - false by default
 */
function getMarkerColor(status, isTransparent = false) {
  return CONFIGS.COLOR[status.toUpperCase()] + (isTransparent ? CONFIGS.COLOR.OPAQUE : '');
}

export default getMarkerColor;
