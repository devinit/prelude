import * as R from 'ramda';

export const capitalize = (val: string) =>
    `${val[0].toUpperCase()}${R.drop(1, val)}`;
