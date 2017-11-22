import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import {apiGetOrderBook} from "../actions";
import Loading from "../../universal/Loading";
import {getOrderBook} from "../../reducers";

class GetOrderBook extends Component {
    componentWillMount() {
        if (!this.props.orderBook) {
            this.props.apiGetOrderBook();
        }
    }
    render () {
        console.log(this.props.orderBookId, this.props.orderBook)
        // if (!this.props.orderBook) {
        //     return <div className="text-center"><Loading /></div>
        // }
        return this.props.children(this.props.orderBook);
    }
}

GetOrderBook.defaultProps = {
};
GetOrderBook.propTypes = {
    orderBookId: PropTypes.string.isRequired,
};
const mapStateToProps = (state, ownProps) => ({
    orderBook: getOrderBook(state, ownProps.orderBookId),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    apiGetOrderBook() {
        dispatch(apiGetOrderBook(ownProps.orderBookId));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(GetOrderBook);