import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {apiGetOrderBook} from "../actions";
import Loading from "../../universal/Loading";
import {getOrderBook} from "../../reducers";
import {convertBackToCurrencyFloat, convertToCurrencyInt, getIndexOfHighestValueWithoutGoingOver} from "../../utils";


const getTransactionType = (isBase, action) => {
    if (isBase) {
        return action === "buy" ? "asks" : "bids";
    } else {
        return action === "buy" ? "bids" : "asks";
    }
};

class GetOrderBookResult extends Component {
    componentWillMount() {
        this.getOrderBook(this.props);
    }
    componentWillUpdate(nextProps, nextState) {
        this.getOrderBook(nextProps);
    }
    calculateResult() {
        let {amount} = this.props;
        const transactionType = getTransactionType(this.props.isBase, this.props.action);
        const arrayOfBreakpoints = this.props.orderBook.get(transactionType).keySeq().toArray();
        const currentTierIndex = getIndexOfHighestValueWithoutGoingOver(arrayOfBreakpoints, amount);
        if (currentTierIndex === -1) {
            return -1;
        }
        // set price tier that amount BEFORE current tier gets calculated at
        const averagePriceTier = this.props.orderBook.getIn([transactionType, arrayOfBreakpoints[currentTierIndex-1]]);
        // set current price tier that is used to calculate value of amount within current tier
        const currentPriceTier = this.props.orderBook.getIn([transactionType, arrayOfBreakpoints[currentTierIndex]]);

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
        return convertBackToCurrencyFloat(totalCost).toFixed(this.props.decimalPlaces);
    }
    render () {
        if (!this.props.orderBook || this.props.orderBook.get('state') === 'fetching') {
            return <div className="text-center"><Loading /></div>
        }
        return this.props.children(this.calculateResult());
    }

    static getOrderBook(props) {
        if (!props.orderBook) {
            props.apiGetOrderBook();
        }
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