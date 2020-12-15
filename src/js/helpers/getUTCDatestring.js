function getUTCDatestring(datestring) {
  const LOCALE = 'en';
  const TIMEZONE = 'UTC';
  return new Date(datestring).toLocaleString(LOCALE, { timeZone: TIMEZONE }).split(',')[0];
}

export default getUTCDatestring;
