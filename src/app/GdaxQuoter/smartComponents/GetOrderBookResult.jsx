import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {apiGetOrderBook} from "../actions";
import Loading from "../../universal/Loading";
import {getOrderBook} from "../../reducers";
import {
    convertBackToCurrencyFloat, convertToCurrencyInt, getIndexOfHighestValueWithoutGoingOver,
    invertCurrencyValue
} from "../../utils";


const getTransactionType = (isBase, action) => {
    // bids = offers to buy
    // asks = offers to sell
    if (isBase) {
        // if isBase, then it is default
        return action === "buy" ? "asks" : "bids";
    }
    // if not isBase, then it is reversed
    return action === "buy" ? "bids" : "asks";
};
const invertPricePoints = (priceTier) => {
    return priceTier && priceTier
        .set('avgPrice', invertCurrencyValue(priceTier.get('avgPrice')))
        .set('price', invertCurrencyValue(priceTier.get('price')));
};

class GetOrderBookResult extends Component {
    componentWillMount() {
        this.getOrderBook(this.props);
    }
    componentWillUpdate(nextProps, nextState) {
        this.getOrderBook(nextProps);
    }
    getOrderBook(props) {
        if (!props.orderBook) {
            props.apiGetOrderBook();
        }
    }
    calculateResult() {
        let {action, amount, decimalPlaces, isBase, orderBook} = this.props;
        const transactionType = getTransactionType(isBase, action);
        const arrayOfBreakpoints = orderBook.get(transactionType).keySeq().toArray();
        const currentTierIndex = getIndexOfHighestValueWithoutGoingOver(arrayOfBreakpoints, amount, !isBase);
        if (currentTierIndex === -1) {
            return -1;
        }
        // set price tier that amount BEFORE current tier gets calculated at
        let averagePriceTier = orderBook.getIn([transactionType, arrayOfBreakpoints[currentTierIndex-1]]);
        // set current price tier that is used to calculate value of amount within current tier
        let currentPriceTier = orderBook.getIn([transactionType, arrayOfBreakpoints[currentTierIndex]]);
        // if not base, then invert the price tiers so that we get proper values
        if (!isBase) {
            averagePriceTier = invertPricePoints(averagePriceTier);
            currentPriceTier = invertPricePoints(currentPriceTier);
        }
        let totalCost = 0;
        // if this is not the first price tier
        if (averagePriceTier) {
            // calculate price for amount that falls within averagePriceTier
            totalCost = convertToCurrencyInt(convertBackToCurrencyFloat(averagePriceTier.get('avgPrice')) * convertBackToCurrencyFloat(averagePriceTier.get('amountAtPrice')));
            // remove amount that has already been priced out so it is not calculated twice
            amount -= averagePriceTier.get('amountAtPrice');
        }
        // add the cost of the remaining amount based on the currentPriceTier
        totalCost += convertToCurrencyInt(convertBackToCurrencyFloat(currentPriceTier.get('price')) * convertBackToCurrencyFloat(amount));

        // return the amount as a float that has been formated to correct number of decimal places for display purposes
        return convertBackToCurrencyFloat(totalCost).toFixed(decimalPlaces);
    }
    render () {
        const {children, orderBook} = this.props;
        if (!orderBook || orderBook.get('state') === 'fetching') {
            return <div className="text-center"><Loading /></div>
        }
        console.log(orderBook.toJS());
        return children(this.calculateResult());
    }
}

GetOrderBookResult.defaultProps = {
    decimalPlaces: 2,
};
GetOrderBookResult.propTypes = {
    orderBookId: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    isBase: PropTypes.bool.isRequired,
    action: PropTypes.string.isRequired,
    decimalPlaces: PropTypes.number,
};
const mapStateToProps = (state, ownProps) => ({
    orderBook: getOrderBook(state, ownProps.orderBookId),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    apiGetOrderBook() {
        dispatch(apiGetOrderBook(ownProps.orderBookId));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(GetOrderBookResult);