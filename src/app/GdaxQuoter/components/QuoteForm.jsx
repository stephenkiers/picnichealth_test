import React, {PureComponent} from 'react';
import {Map} from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loading from "../../universal/Loading";
import Input from "./Input";
import {convertToCurrencyInt} from "../../utils";
import GetOrderBookResult from "../smartComponents/GetOrderBookResult";
import ChooseCurrencySelect from "./ChooseCurrencySelect";
import OrderBookTimer from "./OrderBookTimer";
import DisplayErrorMessage from "./DisplayErrorMessage";

const validPair = (currencies, base, quote) => {
    return currencies.get(base).hasIn(['orderBooks', quote])
};

class QuoteForm extends PureComponent {
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
        this.switchCurrencies = e => {
            e.preventDefault();
            this.setState((state) => ({
                baseCurrencyKey: state.quoteCurrencyKey,
                quoteCurrencyKey: state.baseCurrencyKey
            }));
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
            // this auto set a default based on what was loaded
            // const firstCurrency = props.currencies.first();
            // if (firstCurrency.has('orderBooks')) {
            //     this.setState((state) => ({
            //         baseCurrencyKey: firstCurrency.get('id'),
            //         quoteCurrencyKey: firstCurrency.get('orderBooks').keySeq().first(),
            //     }))
            // }
            if (props.currencies.get('BTC').has('orderBooks')) {
                this.setState((state) => ({
                    baseCurrencyKey: "BTC",
                    quoteCurrencyKey: "USD",
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
        console.log(currentExchange);
        return (
            <form onSubmit={this.preventSubmit}>
                <div className="d-flex align-items-center d-mobile-column d-mobile-wrap">
                    <div className="quoter-currency-group">
                        <div className="d-flex align-items-center">
                            <div className="quoter-buysell">
                                <button
                                    className={`btn btn-${action === "buy" ? "success" : "danger"}`}
                                    onClick={this.toggleAction}
                                >
                                    {action === "buy" ? "Buying" : "Selling"}
                                </button>
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
                    <GetOrderBookResult
                        amount={baseAmount}
                        orderBookId={currentExchange.get('id')}
                        isBase={currentExchange.get('isBase')}
                        action={action}
                        decimalPlaces={currencies.getIn([quoteCurrencyKey, "decimalPlaces"])}
                        maxBase={currentExchange.get('baseMaxSize')}
                        minBase={currentExchange.get('baseMinSize')}
                    >
                        {(result) => {
                            console.log(result);

                            // check if it is a string or number
                            // show error if string
                            if (!parseFloat(result)) {
                                return <DisplayErrorMessage
                                    action={action}
                                    errCode={result}
                                    quoterCurrencyComponent={
                                        <ChooseCurrencySelect
                                            currencies={currencies.getIn([baseCurrencyKey, 'orderBooks']).keySeq()}
                                            currentKey={quoteCurrencyKey}
                                            onChange={this.setQuoteCurrencyKey}
                                        />}
                                />;
                            }

                            return (
                                <div className="d-flex align-items-center justify-content-center d-mobile-wrap">
                                    <div className="quoter-text">
                                        {action === "buy" ? "will cost you" : "will give you"}
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center">
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
                                </div>
                            )
                        }}
                    </GetOrderBookResult>
                    <div className="additional-options">
                        <div className="d-flex justify-content-center">
                            <div className="switch">
                                <button
                                    className="btn btn-secondary"
                                    onClick={this.switchCurrencies}
                                >
                                    Flip currencies
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {currentExchange && currentExchange.has('id') && (
                    <OrderBookTimer
                        orderBookId={currentExchange.get('id')}
                    />
                )}
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