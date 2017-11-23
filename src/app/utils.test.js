import {countDecimalPlaces, getDecimalPlacesFromString, getIndexOfHighestValueWithoutGoingOver} from './utils';


describe('getIndexOfHighestValueWithoutGoingOver', () => {
    it('return correct number', () => {
        expect(getIndexOfHighestValueWithoutGoingOver([0,1,2,3,4,5,6,7,8,9], 8)).toEqual(8);
    });
    it('returns the closest number below', () => {
        expect(getIndexOfHighestValueWithoutGoingOver([0,2,4,6,8,10,12,14,16], 7)).toEqual(3);
    })
});
describe('getDecimalPlacesFromString', () => {
    it('finds the one and returns its position', () => {
        expect(getDecimalPlacesFromString("0.0000001")).toEqual(7);
        expect(getDecimalPlacesFromString("0.0000100")).toEqual(5);
    });
});
describe('countDecimalPlaces', () => {
    it('works on numbers', () => {
        expect(countDecimalPlaces("0.0000001")).toEqual(7);
        expect(countDecimalPlaces(".0000001")).toEqual(7);
        expect(countDecimalPlaces("15457.0000001")).toEqual(7);
    });
    it('returns 0 when none', () => {
        expect(countDecimalPlaces("0")).toEqual(0);
        expect(countDecimalPlaces("10")).toEqual(0);
    });
    it('works with exponents', () => {
        expect(countDecimalPlaces("25e-100")).toEqual(100);
        expect(countDecimalPlaces("2.5e-99")).toEqual(100);
    })
});
