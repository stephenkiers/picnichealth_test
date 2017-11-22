import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GdaxQuoteInputs from "./GdaxQuoteInputs";
import GdaxQuoteOutput from "./GdaxQuoteOutput";

class GdaxQuoter extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }
    render () {
        return (
            <div>
                <GdaxQuoteInputs />
                <GdaxQuoteOutput />
            </div>
        );
    }
}

GdaxQuoter.defaultProps = {
};
GdaxQuoter.propTypes = {
};

export default GdaxQuoter;