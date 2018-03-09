import {formatNumbers} from '.';
import * as prettyFormat from 'pretty-format';

describe('Utility functions test', () => {
    it('should create human friendly numbers i.e 1.5k for 1500', () => {
        const formattedB = [150, 1500, 15000, 200000000].map(val => formatNumbers(val, 1, true));
        expect(prettyFormat({formattedB})).toMatchSnapshot();
    });
});
