
/**
 * confirming we can re-import from index
 */
import * as prettyFormat from 'pretty-format';
import {formatNumbers} from '.';

describe('Utility functions test', () => {
    it('should create human friendly numbers i.e 1.5k for 1500', () => {
        const formattedB = formatNumbers(200000000, 1, true);
        expect(prettyFormat({formattedB})).toMatchSnapshot();
    });
});
