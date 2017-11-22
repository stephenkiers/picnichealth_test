import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetCurrencies from "./smartComponents/GetCurrencies";
import QuoteForm from "./components/QuoteForm";

class GdaxQuoter extends Component {
    render () {
        return (
            <GetCurrencies>
                {(currencies) => {
                    console.log(currencies);
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