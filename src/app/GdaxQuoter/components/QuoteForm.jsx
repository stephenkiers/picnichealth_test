import React, {Component} from 'react';
import {Map} from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loading from "../../universal/Loading";
import Input from "./Input";
import {convertToCurrencyInt} from "../../utils";

const validPair = (currencies, base, quote) => {
    return currencies.get(base).has(quote)
};

class QuoteForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            action: "buy",
            baseAmount: convertToCurrencyInt(1),
            baseCurrencyKey: "",
            quoteAmount: convertToCurrencyInt(1),
            quoteCurrencyKey: ""
        };
        this.setBaseAmount = (baseAmount) => {
            this.setState(() => ({baseAmount}));
        };
        this.setQuoteAmount = (quoteAmount) => {
            this.setState(() => ({quoteAmount}));
        };
        this.setBaseCurrencyKey = (e) => {
            const baseCurrencyKey = e.target.value;
            this.setState((state) => {
                let {quoteCurrencyKey} = state;
                if (!validPair(this.props.currencies, baseCurrencyKey, quoteCurrencyKey)) {
                    quoteCurrencyKey = this.props.currencies.get(baseCurrencyKey).keySeq().first()
                }
                return {
                    baseCurrencyKey,
                    quoteCurrencyKey
                }
            });
        };
        this.setQuoteCurrencyKey = (e) => {
            this.setState({quoteCurrencyKey: e.target.value});
        };
        this.onSubmit = e => {
            e.preventDefault();
        }
    }
    componentDidUpdate() {
        this.validateAmounts();
    }
    componentWillMount() {
        if (!this.state.baseCurrencyKey) {
            this.setState((state) => ({
                baseCurrencyKey: this.props.currencies.keySeq().first(),
                quoteCurrencyKey: this.props.currencies.first().keySeq().first(),
            }))
        }
    }
    baseCurrenciesList() {
        return (
            <select
                className="form-control"
                id="baseCurrenciesList"
                value={this.state.baseCurrencyKey}
                onChange={this.setBaseCurrencyKey}
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
    currentExchangeValues() {
        return this.props.currencies
            .getIn([this.state.baseCurrencyKey, this.state.quoteCurrencyKey]);
    }
    quoteCurrenciesList() {
        if (!this.state.quoteCurrencyKey) {
            return <Loading />;
        }
        return (
            <select
                className="form-control"
                id="quoteCurrenciesList"
                value={this.state.quoteCurrencyKey}
                onChange={this.setQuoteCurrencyKey}
            >
                {this.props.currencies.get(this.state.baseCurrencyKey).keySeq().map(currency => {
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
    validateAmounts() {
        const currentExchange = this.currentExchangeValues();
        const baseMaxSize = currentExchange.get('baseMaxSize');
        const baseMinSize = currentExchange.get('baseMinSize');
        ['baseAmount','quoteAmount'].forEach(amount => {
            if (this.state[amount] > baseMaxSize) {
                this.setState(() => ({[amount]: baseMaxSize}));
            } else if (this.state[amount] < baseMinSize) {
                this.setState(() => ({[amount]: baseMinSize}));
            }
        });
    }
    render () {
        // console.log(this.state);
        return (
            <div>
                <form
                    onSubmit={this.onSubmit}
                >
                    <div className="d-flex align-items-center">
                        <div className="quoter-currency-group">
                            <div className="d-flex">
                                <div className="quoter-input">
                                    <Input
                                        id="baseAmount"
                                        step={this.currentExchangeValues().get('quoteIncrement')}
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
                                    <Input
                                        id="quoteAmount"
                                        step={this.currentExchangeValues().get('quoteIncrement')}
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