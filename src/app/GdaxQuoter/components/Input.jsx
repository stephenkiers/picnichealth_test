import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {convertBackToCurrencyFloat, convertToCurrencyInt, formatCurrency} from "../../utils";

class Input extends PureComponent {
    constructor(props) {
        super();
        this.state = {
            value: props.value,
        };
        this.onChange = e => {
            const newAmount = e.target.value ? parseFloat(e.target.value) : '';
            this.setState(() => ({value: newAmount}));
            if (newAmount > 0) {
                this.props.onChange(convertToCurrencyInt(e.target.value));
            }
        };
        this.onBlur = () => {
            if (this.state.value !== this.props.value) {
                this.setState(() => ({value: this.props.value}));
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState(() => ({value: nextProps.value}));
        }
    }
    render () {
        return (
            <input
                type="number"
                className="form-control"
                id={this.props.id}
                step={this.props.step}
                value={formatCurrency(convertBackToCurrencyFloat(this.state.value), this.props.decimalPlaces)}
                onChange={this.onChange}
                onBlur={this.onBlur}
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