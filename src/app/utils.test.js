import {formatTelephoneNumber, generateRandomUUID} from './utils';


describe('formatTelephoneNumber', () => {
    it('formats the telephone number', () => {
        expect(formatTelephoneNumber('5555555555')).toEqual('555-555-5555')
    })
    it('formats the telephone number', () => {
        expect(formatTelephoneNumber(5555555555)).toEqual('555-555-5555')
    })
});
describe('generateRandomUUID', () => {
    it('generates a 10 digit string uuid', () => {
        const uuid = generateRandomUUID();
        expect(uuid.length).toEqual(10);
        expect(typeof uuid).toEqual('string');
    })
});