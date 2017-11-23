import React, {PureComponent} from 'react';
import GetCurrencies from "./smartComponents/GetCurrencies";
import QuoteForm from "./components/QuoteForm";

class GdaxQuoter extends PureComponent {
    render () {
        return (
            <GetCurrencies>
                {(currencies) => {
                    console.log(currencies.toJS());
                    return <QuoteForm currencies={currencies}/>
                }}
            </GetCurrencies>
        );
    }
}

GdaxQuoter.defaultProps = {
};
GdaxQuoter.propTypes = {
};

export default GdaxQuoter;