import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import {apiGetOrderBook} from "../actions";
import Loading from "../../universal/Loading";
import {getOrderBook} from "../../reducers";
import {convertBackToCurrencyFloat, getHighestValueWithoutGoingOver} from "../../utils";

class GetOrderBookResult extends Component {
    componentWillMount() {
        this.getOrderBook();
    }
    componentWillUpdate() {
        this.getOrderBook();
    }
    calculateResult() {
        console.log(this.props.orderBookId, this.props.orderBook);
        if (this.props.orderBook) {
            console.log("calculateResult()", this.props.orderBook, this.props.type, this.props.amount);
        }
        let id, avgPrice;
        if (this.props.type === "bid") {
            const array = this.props.orderBook.get("bids").keySeq().toArray();
            id = getHighestValueWithoutGoingOver(array, this.props.amount);
            avgPrice = this.props.orderBook.getIn(["bids", id, "price"]);
        } else {
            const array = this.props.orderBook.get("asks").keySeq().toArray();
            id = getHighestValueWithoutGoingOver(array, this.props.amount);
            avgPrice = this.props.orderBook.getIn(["asks", id, "price"]);
        }
        return convertBackToCurrencyFloat(this.props.amount * avgPrice);
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
    type: PropTypes.string.isRequired,
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