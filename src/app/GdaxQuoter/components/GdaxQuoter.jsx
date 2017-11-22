import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {apiGetCurrencies} from "../actions";
import {getCurrencies} from "../../reducers";

class GdaxQuoter extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            action: "buy",
            baseAmount: 1,
            baseCurrency: "",
            quoteAmount: 1,
            quoteCurrency: ""
        };
        this.setBaseAmount = (e) => {
            const baseAmount =  e.target.value;
            if (baseAmount > 0) {
                this.setState(() => ({baseAmount}));
            }
        };
        this.setQuoteAmount = (e) => {
            const quoteAmount =  e.target.value;
            if (quoteAmount > 0) {
                this.setState(() => ({quoteAmount}));
            }
        };
        this.setBaseCurrency = (baseCurrency) => {
            this.setState({baseCurrency});
        };
        this.setQuoteCurrency = (newCurrency) => {
            this.setState({newCurrency});
        };
        this.switchAction = () => {
            this.setState((state) => ({action: state.action === "buy" ? "sell" : "buy"}));
        };
        this.onSubmit = e => {
            e.preventDefault();
        }
    }
    componentWillMount() {
        this.props.getCurrencies()
    }
    baseCurrenciesList() {
        return (
            <select className="form-control" id="baseCurrenciesList">
                <option>USD</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        )
    }
    quoteCurrenciesList() {
        return (
            <select className="form-control" id="quoteCurrenciesList">
                <option>BTC</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        )
    }
    render () {
        console.log(this.props.currencies);
        return (
            <div>
                <form
                    onSubmit={this.onSubmit}
                >
                    <div className="d-flex align-items-center">
                        <div className="quoter-currency-group">
                            <div className="d-flex">
                                <div className="quoter-input">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="baseAmount"
                                        value={this.state.baseAmount}
                                        onChange={this.setBaseAmount}
                                    />
                                </div>
                                <div className="quoter-currency">
                                    {this.baseCurrenciesList()}
                                </div>
                            </div>
                        </div>
                        <div className="quoter-equals">
                            equals
                        </div>
                        <div className="quoter-currency-group">
                            <div className="d-flex">
                                <div className="quoter-input">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="quoteAmount"
                                        value={this.state.quoteAmount}
                                        onChange={this.setQuoteAmount}
                                    />
                                </div>
                                <div className="quoter-currency">
                                    {this.quoteCurrenciesList()}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

GdaxQuoter.defaultProps = {
};
GdaxQuoter.propTypes = {
};
const mapStateToProps = (state, ownProps) => ({
    currencies: getCurrencies(state),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    getCurrencies() {
        dispatch(apiGetCurrencies())
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(GdaxQuoter);