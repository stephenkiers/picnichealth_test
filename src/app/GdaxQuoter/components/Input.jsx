import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {convertBackToCurrencyFloat, convertToCurrencyInt, formatCurrency} from "../../utils";

class Input extends PureComponent {
    constructor(props) {
        super();
        this.onChange = e => {
            const newAmount = parseFloat(e.target.value);
            if (newAmount > 0) {
                this.props.onChange(convertToCurrencyInt(e.target.value));
            }
        };
    }
    render () {
        return (
            <input
                type="number"
                className="form-control"
                id={this.props.id}
                step={this.props.step}
                value={formatCurrency(convertBackToCurrencyFloat(this.props.value), this.props.decimalPlaces)}
                onChange={this.onChange}
            />
        );
    }
}

Input.defaultProps = {
    decimalPlaces: 2,
};
Input.propTypes = {
    id: PropTypes.string.isRequired,
    step: PropTypes.string,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    decimalPlaces: PropTypes.number,
};

export default Input;