import React, {Component} from 'react';
import { connect } from 'react-redux';
import {apiGetCurrencies} from "../actions";
import {getCurrencies} from "../../reducers";
import Loading from "../../universal/Loading";

class GetCurrencies extends Component {
    componentWillMount() {
        if (this.props.currencies.size === 0) {
            this.props.apiGetCurrencies()
        }
    }
    render () {
        if (this.props.currencies.size === 0) {
            return <div className="text-center"><Loading /></div>
        }
        return this.props.children(this.props.currencies);
    }
}
const mapStateToProps = (state, ownProps) => ({
    currencies: getCurrencies(state),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    apiGetCurrencies() {
        dispatch(apiGetCurrencies())
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(GetCurrencies);