import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class GdaxQuoteInputs extends PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }
    render () {
        return (
            <div></div>
        );
    }
}

GdaxQuoteInputs.defaultProps = {
};
GdaxQuoteInputs.propTypes = {
    action: PropTypes.string.isRequired,
    switchAction: PropTypes.func.isRequired,
    baseCurrency: PropTypes.string.isRequired,
    setBaseCurrency: PropTypes.func.isRequired,
    quoteCurrency: PropTypes.string.isRequired,
    setQuoteCurrency: PropTypes.func.isRequired,
    amount: PropTypes.string.isRequired,
    setAmount: PropTypes.func.isRequired,
};

export default GdaxQuoteInputs;