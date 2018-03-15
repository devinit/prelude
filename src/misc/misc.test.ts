import 'jest';
import {getShortURL} from '.';

describe('misc tests', () => {
    it('should return short url of a long url', async () => {
        const url =
          await getShortURL('http://212.71.254.23:9999/country/uganda?state={"year":2015,"budgetType":"actual"}');
        expect(url).toMatchSnapshot();
      },
      20000,
    );
});
