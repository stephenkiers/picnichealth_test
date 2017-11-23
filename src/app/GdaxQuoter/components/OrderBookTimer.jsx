import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import {apiGetOrderBook} from "../actions";
import {getOrderBook} from "../../reducers";
import {timeRemaining} from "../../utils";

class OrderBookTimer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            timeRemaining: "",
            refreshPending: false
        };
        this.tick = () => {
            this.setState(() => ({
                timeRemaining: timeRemaining(this.props.orderBook.get('updatedAt'))
            }))
        };
    }
    componentWillReceiveProps(nextProps) {
        if (
            this.state.refreshPending &&
            nextProps.orderBook.get('updatedAt') !== this.props.orderBook.get('updatedAt')
        ) {
           this.setState(() => ({refreshPending: false}));
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.timeRemaining === "0:00" && !this.state.refreshPending) {
            this.setState(() => ({refreshPending: true}));
            this.props.apiGetOrderBook();
        }
    }
    componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render () {
        if (!this.props.orderBook || !this.state.timeRemaining) {
            return null;
        }
        if (this.state.refreshPending) {
            return <div>refreshing order book....</div>;
        }
        return (
            <div className="reset-timer">
                This order book will automatically refresh in {this.state.timeRemaining}.
                {" "}
                <a
                    href="javascript:void(0)"
                    onClick={this.props.apiGetOrderBook}
                >
                    Click here to refresh now.
                </a>
            </div>
        );
    }
}

OrderBookTimer.defaultProps = {
};
OrderBookTimer.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderBookTimer);