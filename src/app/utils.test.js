import {
    buildOrderedMapFromBook, convertToCurrencyInt, countDecimalPlaces, getDecimalPlacesFromString,
    getIndexOfHighestValueWithoutGoingOver
} from './utils';
import {Map} from 'immutable';

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

describe('buildOrderedMapFromBook', () => {
    const testRes = {
        "sequence":12345,
        "bids":[
            // PRICE, AMOUNT, ORDERS
            ["0.1","10",4],
            ["0.2","10",2],
            ["0.3","10",3],
        ],
        "asks":[
            // PRICE, AMOUNT, ORDERS
            ["0.09","10",6],
            ["0.08","10",8],
            ["0.07","10",6],
        ]
    };
    it('return proper base bids', () => {
        expect(
            JSON.stringify(
                buildOrderedMapFromBook(testRes, "bids", true).toJS()
            )
        ).toEqual(JSON.stringify(
                Map({
                    [convertToCurrencyInt(10)]: Map({
                        amountAtPrice: convertToCurrencyInt(10),
                        avgPrice: convertToCurrencyInt(0.1),
                        price: convertToCurrencyInt(0.1),
                    }),
                    [convertToCurrencyInt(20)]: Map({
                        amountAtPrice: convertToCurrencyInt(20),
                        avgPrice: convertToCurrencyInt(0.15),
                        price: convertToCurrencyInt(0.2),
                    }),
                    [convertToCurrencyInt(30)]: Map({
                        amountAtPrice: convertToCurrencyInt(30),
                        avgPrice: convertToCurrencyInt(0.2),
                        price: convertToCurrencyInt(0.3),
                    }),
                }).toJS()
            ));
    });
    it('return proper base asks', () => {
        expect(
            JSON.stringify(
                buildOrderedMapFromBook(testRes, "asks", true).toJS()
            )
        ).toEqual(JSON.stringify(
            Map({
                [convertToCurrencyInt(10)]: Map({
                    amountAtPrice: convertToCurrencyInt(10),
                    avgPrice: convertToCurrencyInt(0.09),
                    price: convertToCurrencyInt(0.09),
                }),
                [convertToCurrencyInt(20)]: Map({
                    amountAtPrice: convertToCurrencyInt(20),
                    avgPrice: convertToCurrencyInt((1.7/20)),
                    price: convertToCurrencyInt(0.08),
                }),
                [convertToCurrencyInt(30)]: Map({
                    amountAtPrice: convertToCurrencyInt(30),
                    avgPrice: convertToCurrencyInt((2.4/30)),
                    price: convertToCurrencyInt(0.07),
                }),
            }).toJS()
        ));
    });
    it('return proper quote bids', () => {
        expect(
            JSON.stringify(
                buildOrderedMapFromBook(testRes, "bids", false).toJS()
            )
        ).toEqual(JSON.stringify(
            Map({
                [convertToCurrencyInt(1)]: Map({
                    amountAtPrice: convertToCurrencyInt(1),
                    avgPrice: convertToCurrencyInt(10),
                    price: convertToCurrencyInt(10),
                }),
                [convertToCurrencyInt(3)]: Map({
                    amountAtPrice: convertToCurrencyInt(3),
                    avgPrice: convertToCurrencyInt(6.666666666666667),
                    price: convertToCurrencyInt(5),
                }),
                [convertToCurrencyInt(6)]: Map({
                    amountAtPrice: convertToCurrencyInt(6),
                    avgPrice: convertToCurrencyInt(5),
                    price: convertToCurrencyInt(3.3333333333333335),
                }),
            }).toJS()
        ));
    });
    it('return proper quote asks', () => {
        expect(
            JSON.stringify(
                buildOrderedMapFromBook(testRes, "asks", false).toJS()
            )
        ).toEqual(JSON.stringify(
            Map({
                [convertToCurrencyInt(0.8999999999999999)]: Map({
                    amountAtPrice: convertToCurrencyInt(0.8999999999999999),
                    avgPrice: convertToCurrencyInt(11.111111111111112),
                    price: convertToCurrencyInt(11.111111111111112),
                }),
                [convertToCurrencyInt(1.7)]: Map({
                    amountAtPrice: convertToCurrencyInt(1.7),
                    avgPrice: convertToCurrencyInt(11.764705882352942),
                    price: convertToCurrencyInt(12.5),
                }),
                [convertToCurrencyInt(2.4)]: Map({
                    amountAtPrice: convertToCurrencyInt(2.4),
                    avgPrice: convertToCurrencyInt(12.5),
                    price: convertToCurrencyInt(14.285714285714285),
                }),
            }).toJS()
        ));
    });
});
