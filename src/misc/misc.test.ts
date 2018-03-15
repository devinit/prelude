import 'jest';
import {getShortURL, sendEmail} from '.';

describe('misc tests', () => {
    it('should return short url of a long url', async () => {
        const url =
          await getShortURL('http://212.71.254.23:9999/country/uganda?state={"year":2015,"budgetType":"actual"}');
        expect(url).toMatchSnapshot();
      },
      20000,
    );
    it('should run without errors while sending email', async () => {
      const response = await sendEmail({
        message: 'test',
        token: 'e2DQks99XapU6w2s1',
        emails: ['epicallan.al@gmail.com'],
        subject: 'test email from datahub'
      });
      expect(response.status).toBe(200);
    });
});
