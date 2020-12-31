import {
  capitalizeFirstLetter,
  radius,
  formatNumber,
} from './index';

describe('Capping a lowercase string', () => {
  test('hello should be Hello', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  test('HELLO should remain HELLO', () => {
    expect(capitalizeFirstLetter('HELLO')).toMatch('HELLO');
  });
});

describe('Getting a radius from an area', () => {
  test('radius.fromArea(Math.PI) === 1', () => {
    expect(radius.fromArea(Math.PI)).toEqual(1);
  });

  test('radius.fromArea(4 * Math.PI) === 2', () => {
    expect(radius.fromArea(4 * Math.PI)).toEqual(2);
  });

  test('No argument returns NaN', () => {
    expect(radius.fromArea()).not.toBeTruthy();
  });
});

describe('Formatting a number', () => {
  test('formatNumber(1000) === 1.0K', () => {
    expect(formatNumber.toNamedString(1000)).toBe('1.0K');
  });
});
