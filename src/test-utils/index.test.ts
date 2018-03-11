
import * as prettyFormat from 'pretty-format';
import {uidPatchForObjs} from '.';
import dummyData from './testData';

describe('Utility functions test', () => {
    it('should turn uid values into unique_id_stub', () => {
        const data =  uidPatchForObjs(dummyData);
        expect(prettyFormat({data})).toMatchSnapshot();
    });
});
