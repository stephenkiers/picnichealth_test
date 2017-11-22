import React, {Component} from 'react';
import {Map} from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loading from "../../universal/Loading";
import Input from "./Input";
import {convertBackToCurrencyFloat, convertToCurrencyInt} from "../../utils";
import GetOrderBookResult from "../smartComponents/GetOrderBookResult";
import {config} from "../../constants";

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
        };
        this.setBaseAmount = (baseAmount) => {
            this.setState(() => ({baseAmount}));
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
        this.toggleAction = () => {
            this.setState((state) => ({action: state.action === "buy" ? "sell" : "buy"}))
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
    buySellButton() {
        return (
            <button
                className="btn btn-primary"
                onClick={this.toggleAction}
            >
                {this.state.action === "buy" ? "Buying" : "Selling"}
            </button>
        )
    }
    currentExchangeValues() {
        return this.props.currencies.getIn([this.state.baseCurrencyKey, this.state.quoteCurrencyKey]);
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
        const {baseMaxSize, baseMinSize} = this.currentExchangeValues();
        if (this.state.baseAmount > baseMaxSize) {
            this.setState(() => ({baseAmount: baseMaxSize}));
        } else if (this.state.baseAmount < baseMinSize) {
            this.setState(() => ({baseAmount: baseMinSize}));
        }
    };
    render () {
        const currentExchange = this.currentExchangeValues();
        console.log(5, this.state.baseCurrencyKey, this.state.quoteCurrencyKey, currentExchange.toJS());
        return (
            <div>
                <form
                    onSubmit={this.onSubmit}
                >
                    <div className="d-flex align-items-center">
                        <div className="quoter-currency-group">
                            <div className="d-flex">
                                <div className="quoter-buysell">
                                    {this.buySellButton()}
                                </div>
                                <div className="quoter-input">
                                    <Input
                                        id="baseAmount"
                                        step={currentExchange.get('quoteIncrement')}
                                        value={this.state.baseAmount}
                                        onChange={this.setBaseAmount}
                                    />
                                </div>
                                <div className="quoter-currency">
                                    {this.baseCurrenciesList()}
                                </div>
                            </div>
                        </div>
                        <div className="quoter-text">
                            {this.state.action === "buy" ? "will cost you" : "will give you"}
                        </div>
                        <GetOrderBookResult
                            amount={this.state.baseAmount}
                            orderBookId={currentExchange.get('id')}
                            isBase={currentExchange.get('isBase')}
                            action={this.state.action}
                        >
                            {(result) => (
                                <div className="d-flex align-items-center">
                                    <div className="quoter-result">
                                        {result}
                                    </div>
                                    <div className="quoter-currency">
                                        {this.quoteCurrenciesList()}
                                    </div>
                                </div>
                            )}
                        </GetOrderBookResult>
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