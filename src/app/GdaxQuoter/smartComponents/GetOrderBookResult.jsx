import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import {apiGetOrderBook} from "../actions";
import Loading from "../../universal/Loading";
import {getOrderBook} from "../../reducers";
import {convertBackToCurrencyFloat, getHighestValueWithoutGoingOver} from "../../utils";
import {config} from "../../constants";

class GetOrderBookResult extends Component {
    componentWillMount() {
        this.getOrderBook();
    }
    componentWillUpdate() {
        this.getOrderBook();
    }
    calculateResult() {
        let type;
        if (this.props.isBase) {
            type = this.props.action === "buy" ? "bids" : "asks";
        } else {
            type = this.props.action === "buy" ? "asks" : "bids";
        }
        const array = this.props.orderBook.get(type).keySeq().toArray();
        const id = getHighestValueWithoutGoingOver(array, this.props.amount);
        const avgPrice = this.props.orderBook.getIn([type, id, "price"]);
        if (this.props.orderBook) {
            console.log("calculateResult()", type, this.props.orderBook.toJS(), this.props.amount, id, avgPrice, this.props.amount * avgPrice, convertBackToCurrencyFloat(this.props.amount * avgPrice, Math.pow(config.DEFAULT_PRECISION, 2)));
        }
        return convertBackToCurrencyFloat(this.props.amount) * convertBackToCurrencyFloat(avgPrice);
    }
    getOrderBook() {
        if (!this.props.orderBook) {
            this.props.apiGetOrderBook();
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
};
GetOrderBookResult.propTypes = {
    orderBookId: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    isBase: PropTypes.bool.isRequired,
    action: PropTypes.string.isRequired,
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