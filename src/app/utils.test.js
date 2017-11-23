import {getIndexOfHighestValueWithoutGoingOver} from './utils';


describe('binarySerach', () => {
    it('return correct number', () => {
        expect(getIndexOfHighestValueWithoutGoingOver([0,1,2,3,4,5,6,7,8,9], 8)).toEqual(8)
    });
    it('returns the closest number below', () => {
        expect(getIndexOfHighestValueWithoutGoingOver([0,2,4,6,8,10,12,14,16], 7)).toEqual(3)
    })
});