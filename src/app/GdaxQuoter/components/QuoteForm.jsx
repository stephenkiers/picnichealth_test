import React, {Component} from 'react';
import {Map} from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loading from "../../universal/Loading";
import Input from "./Input";
import {convertToCurrencyInt} from "../../utils";
import GetOrderBookResult from "../smartComponents/GetOrderBookResult";

const validPair = (currencies, base, quote) => {
    return currencies.get(base).hasIn(['orderBooks', quote])
};

const BuySellButton = ({action, onClick}) => (
    <button
        className={`btn btn-${action === "buy" ? "success" : "danger"}`}
        onClick={onClick}
    >
        {action === "buy" ? "Buying" : "Selling"}
    </button>
);
const BaseCurrenciesList = ({baseCurrencyKey, currencies, setBaseCurrencyKey}) => (
    <select
        className="form-control"
        id="baseCurrenciesList"
        value={baseCurrencyKey}
        onChange={setBaseCurrencyKey}
    >
        {currencies.map(currency => {
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
);

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
                    quoteCurrencyKey = this.props.currencies.getIn([baseCurrencyKey, 'orderBooks']).keySeq().first()
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
        this.preventSubmit = e => {
            e.preventDefault();
        }
    }
    componentDidUpdate() {
        this.validateAmounts();
    }
    componentWillMount() {
        this.setDefault(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.setDefault(nextProps);
    }
    setDefault(props) {
        if (!this.state.baseCurrencyKey) {
            const firstCurrency = props.currencies.first();
            if (firstCurrency.has('orderBooks')) {
                this.setState((state) => ({
                    baseCurrencyKey: firstCurrency.get('id'),
                    quoteCurrencyKey: firstCurrency.get('orderBooks').keySeq().first(),
                }))
            }
        }
    }
    currentExchangeValues() {
        return this.props.currencies.getIn([this.state.baseCurrencyKey, 'orderBooks', this.state.quoteCurrencyKey]);
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
                {this.props.currencies.getIn([this.state.baseCurrencyKey, 'orderBooks']).keySeq().map(currency => {
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
        if (!this.state.baseCurrencyKey) {
            return <div className="text-center"><Loading /></div>
        }
        const currentExchange = this.currentExchangeValues();
        return (
            <form onSubmit={this.preventSubmit}>
                <div className="d-flex align-items-center">
                    <div className="quoter-currency-group">
                        <div className="d-flex">
                            <div className="quoter-buysell">
                                <BuySellButton
                                    action={this.state.action}
                                    onClick={this.toggleAction}
                                />
                            </div>
                            <div className="quoter-input">
                                <Input
                                    id="baseAmount"
                                    step={currentExchange.get('quoteIncrement')}
                                    value={this.state.baseAmount}
                                    onChange={this.setBaseAmount}
                                    decimalPlaces={this.props.currencies.getIn([this.state.baseCurrencyKey, "decimalPlaces"])}
                                />
                            </div>
                            <div className="quoter-currency">
                                <BaseCurrenciesList
                                    baseCurrencyKey={this.state.baseCurrencyKey}
                                    currencies={this.props.currencies.keySeq()}
                                    setBaseCurrencyKey={this.setBaseCurrencyKey}
                                />
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
                        decimalPlaces={this.props.currencies.getIn([this.state.quoteCurrencyKey, "decimalPlaces"])}
                    >
                        {(result) => {
                            if (result === -1) {
                                return <div>Unable to calculate</div>
                            }
                            return (
                                <div className="d-flex align-items-center">
                                    <div className="quoter-result">
                                        {result}
                                    </div>
                                    <div className="quoter-currency">
                                        {this.quoteCurrenciesList()}
                                    </div>
                                </div>
                            )
                        }}
                    </GetOrderBookResult>
                </div>
            </form>
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