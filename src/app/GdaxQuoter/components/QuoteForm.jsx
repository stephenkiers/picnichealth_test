import React, {Component} from 'react';
import {Map} from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loading from "../../universal/Loading";
import Input from "./Input";
import {convertToCurrencyInt} from "../../utils";
import GetOrderBookResult from "../smartComponents/GetOrderBookResult";
import ChooseCurrencySelect from "./ChooseCurrencySelect";
import BuySellButton from "./BuySellButton";

const validPair = (currencies, base, quote) => {
    return currencies.get(base).hasIn(['orderBooks', quote])
};

class QuoteForm extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            action: "buy",
            baseAmount: convertToCurrencyInt(1),
            baseCurrencyKey: "",
            quoteCurrencyKey: "",
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
        const {action, baseAmount, baseCurrencyKey, quoteCurrencyKey} = this.state;
        const {currencies} = this.props;
        return (
            <form onSubmit={this.preventSubmit}>
                <div className="d-flex align-items-center">
                    <div className="quoter-currency-group">
                        <div className="d-flex">
                            <div className="quoter-buysell">
                                <BuySellButton
                                    action={action}
                                    onClick={this.toggleAction}
                                />
                            </div>
                            <div className="quoter-input">
                                <Input
                                    id="baseAmount"
                                    step={currentExchange.get('quoteIncrement')}
                                    value={baseAmount}
                                    onChange={this.setBaseAmount}
                                    decimalPlaces={currencies.getIn([baseCurrencyKey, "decimalPlaces"])}
                                />
                            </div>
                            <div className="quoter-currency">
                                <ChooseCurrencySelect
                                    currencies={currencies.keySeq()}
                                    currentKey={baseCurrencyKey}
                                    onChange={this.setBaseCurrencyKey}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="quoter-text">
                        {action === "buy" ? "will cost you" : "will give you"}
                    </div>
                    <GetOrderBookResult
                        amount={baseAmount}
                        orderBookId={currentExchange.get('id')}
                        isBase={currentExchange.get('isBase')}
                        action={action}
                        decimalPlaces={currencies.getIn([quoteCurrencyKey, "decimalPlaces"])}
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
                                        <ChooseCurrencySelect
                                            currencies={currencies.getIn([baseCurrencyKey, 'orderBooks']).keySeq()}
                                            currentKey={quoteCurrencyKey}
                                            onChange={this.setQuoteCurrencyKey}
                                        />
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