import React, {Component} from 'react';
import {Map} from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loading from "../../universal/Loading";

class QuoteForm extends Component {
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
        if (!this.state.baseCurrency) {
            this.setState((state) => ({
                baseCurrency: this.props.currencies.keySeq().first(),
                quoteCurrency: this.props.currencies.first().keySeq().first(),
            }))
        }
    }
    baseCurrenciesList() {
        if (this.props.currencies.size === 0) {
            return <Loading />;
        }
        return (
            <select
                className="form-control"
                id="baseCurrenciesList"
                value={this.state.baseCurrency}
            >
                {this.props.currencies.keySeq().map(currency => {
                    return (
                        <option
                            key={currency}
                            value={currency}
                        >
                            {currency.toUpperCase()}
                        </option>
                    )
                })}
            </select>
        )
    }
    quoteCurrenciesList() {
        if (this.props.currencies.size === 0 || !this.state.baseCurrency) {
            return <Loading />;
        }
        return (
            <select
                className="form-control"
                id="quoteCurrenciesList"
                value={this.state.quoteCurrency}
            >
                {this.props.currencies.get(this.state.baseCurrency).keySeq().map(currency => {
                    return (
                        <option
                            key={currency}
                            value={currency}
                        >
                            {currency.toUpperCase()}
                        </option>
                    )
                })}
            </select>
        )
    }
    render () {
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

QuoteForm.defaultProps = {
    currencies: Map(),
};
QuoteForm.propTypes = {
    currencies: ImmutablePropTypes.map.isRequired,
};
export default QuoteForm;