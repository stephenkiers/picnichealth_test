import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

class GetOrderBook extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }
    componentWillMount() {
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    componentDidMount() {
    }
    componentWillReceiveProps(nextProps) {
    }

    render () {
        return (
            <div />
        );
    }
}

GetOrderBook.defaultProps = {
};
GetOrderBook.propTypes = {
    bookId: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(GetOrderBook);