import {
  createTemplate,
} from './_helpers';

describe('Testing the data object template', () => {
  test('createTemplate()', () => {
    expect(createTemplate()).toEqual({
      allCases: 0,
      allCases100k: 0,
      allDeaths: 0,
      allDeaths100k: 0,
      allRecovered: 0,
      allRecovered100k: 0,
      historic: {
        allCases: [],
        allCases100k: [],
        allDeaths: [],
        allDeaths100k: [],
        allRecovered: [],
        allRecovered100k: [],
        dates: [],
        todayCases: [],
        todayCases100k: [],
        todayDeaths: [],
        todayDeaths100k: [],
        todayRecovered: [],
        todayRecovered100k: [],
      },
      todayCases: 0,
      todayCases100k: 0,
      todayDeaths: 0,
      todayDeaths100k: 0,
      todayRecovered: 0,
      todayRecovered100k: 0,
    });
  });
});
