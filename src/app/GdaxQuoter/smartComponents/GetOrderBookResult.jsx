import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import {apiGetOrderBook} from "../actions";
import Loading from "../../universal/Loading";
import {getOrderBook} from "../../reducers";
import {convertBackToCurrencyFloat, convertToCurrencyInt, getIndexOfHighestValueWithoutGoingOver} from "../../utils";
import {config} from "../../constants";

class GetOrderBookResult extends Component {
    componentWillMount() {
        this.getOrderBook(this.props);
    }
    componentWillUpdate(nextProps, nextState) {
        this.getOrderBook(nextProps);
    }
    calculateResult() {
        let type;
        let {amount} = this.props;
        if (this.props.isBase) {
            type = this.props.action === "buy" ? "asks" : "bids";
        } else {
            type = this.props.action === "buy" ? "bids" : "asks";
        }
        const arrayOfBreakpoints = this.props.orderBook.get(type).keySeq().toArray();
        const index = getIndexOfHighestValueWithoutGoingOver(arrayOfBreakpoints, amount);
        const firstPriceGroup = this.props.orderBook.getIn([type, arrayOfBreakpoints[index-1]]);
        const remainingPriceGroup = this.props.orderBook.getIn([type, arrayOfBreakpoints[index]]);

        let totalCost = 0;
        if (firstPriceGroup) {
            totalCost = convertToCurrencyInt(convertBackToCurrencyFloat(firstPriceGroup.get('avgPrice')) * convertBackToCurrencyFloat(firstPriceGroup.get('amountAtPrice')));
            amount -= firstPriceGroup.get('amountAtPrice');
        }
        totalCost += convertToCurrencyInt(convertBackToCurrencyFloat(remainingPriceGroup.get('price')) * convertBackToCurrencyFloat(amount));

        return convertBackToCurrencyFloat(totalCost).toFixed(this.props.decimalPlaces);
    }
    getOrderBook(props) {
        if (!props.orderBook) {
            props.apiGetOrderBook();
        }
    }
    render () {
        if (!this.props.orderBook || this.props.orderBook.get('state') === 'fetching') {
            return <div className="text-center"><Loading /></div>
        }
        return this.props.children(this.calculateResult());
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