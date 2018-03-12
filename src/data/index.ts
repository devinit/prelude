import * as R from 'ramda';
import * as shortid from 'shortid';
import {IDatabase} from 'pg-promise';
import {approximate} from '../numbers';

export interface IExtensions {
    manyCacheable: (query: string, values?: object | string) => Promise<any[]>;
}

export interface Isummable {
    value: number | string | null;
}

export interface IhasDiId {
    di_id: string;
}

export type IDB = IDatabase<IExtensions> & IExtensions;

export const RECIPIENT = 'recipient';
export const DONOR = 'donor';
export const MULTILATERAL = 'multilateral';
export const  CROSSOVER = 'crossover';
// TODO: should get from a refrence file
export const  budgetTypesRefs = {
    actual: 'Actual',
    estimated: 'Estimated',
    proposed: 'Proposed',
    approved: 'Approved',
    budget: 'Budget',
    proj: 'Projected'
};

// makes numerical like values numbers in an object
export const toNumericFields: (obj: any) => any = (obj) => {
    return R.keys(obj).reduce((newObj: any, key: string) => {
        const isKeyNumerical = Number(obj[key]) ? true : false;
        if (isKeyNumerical) {
            return {...newObj, [key]:  Number(obj[key])};
        }
        return {...newObj, [key]: obj[key]};
    }, {});
};

export const toId: (obj: IhasDiId ) => any = (obj) => {
    if (!obj.di_id) return obj;
    const id = obj.di_id;
    const newObj = R.omit(['di_id'], obj);
    return {...newObj, id };
};

export const getTotal = (data: Isummable[]): number =>
    R.reduce<Isummable, number>((sum: number, obj: Isummable): number => {
        if (obj.value) sum += Number(obj.value);
        return sum;
    }, 0, data);

export const valuesIntoPercents = <T extends {value: number}>(data: T[], precision?: number): T[] => {
    const sum = getTotal(data);
    return data.map((obj: T) => {
        const newValue  = (obj.value / sum) * 100;
        const value = precision ? Number(approximate(newValue, precision)) : Math.round(newValue);
        return Object.assign(obj, {value});
    });
};

export const groupedValuesIntoPercents =
    <T extends {value: number}>(data: T[], groupName: string, precision?: number): T[] => {
    const groups = R.groupBy<T>((obj) => obj[groupName].toString(), data);
    const groupAsPers: any[][] = R.keys(groups).map(key =>
        valuesIntoPercents(groups[key] as T[], precision));
    return R.flatten(groupAsPers);
};

export const getTableNameFromSql = (sqlStr: string): string | Error => {
    const matches = sqlStr.match(/FROM(.*)WHERE/);
    if (matches && matches.length) {
        return matches[0].split(/\s/)[1];
    }
    return new Error(`couldnt get table name from sql string ${sqlStr}`);
};

export const getIndicatorDataSimple = async<T extends {}> ({db, query}: {db: IDB, query: string}): Promise<T[]> => {
    const raw = await db.manyCacheable(query);
    return raw
        .map(toNumericFields)
        .map(obj => ({...obj, uid: shortid.generate()})) as T[];
};

export const normalizeKeyName = (columnName: string): string => {
    const str = columnName.includes('value_') ? columnName.split(/value\_/)[1] : columnName;
    return str.replace(/\_/g, '-');
};

export const normalizeKeyNames = (obj: {}) => {
    return R.keys(obj).reduce((acc, key) => {
        const newKeyName = key.includes('_') ? normalizeKeyName(key) : key;
        if (newKeyName) {
            const newObj = R.omit([key], obj);
            return {...newObj, [newKeyName]: obj[newKeyName]};
        }
        return {...acc, [key]: obj[key]}; // return to default
    }, {});
};
