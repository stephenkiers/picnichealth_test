import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {convertBackToCurrencyFloat, convertToCurrencyInt, formatCurrency} from "../../utils";

class Input extends PureComponent {
    constructor(props) {
        super();
        this.state = {
            value: props.value,
            warning: false,
        };
        this.onChange = e => {
            const newAmount = e.target.value ? parseFloat(e.target.value) : '';
            this.setState(() => ({value: newAmount}));
            const convertedValue = convertToCurrencyInt(e.target.value);
            if (
                convertedValue >= this.props.min &&
                convertedValue <= this.props.max
            ) {
                this.props.onChange(convertedValue);
                this.setState(() => ({warning: false}));
            } else {
                this.setState(() => ({warning: true}));
            }
        };
        this.onBlur = () => {
            if (this.state.value !== this.props.value) {
                this.setState(() => ({
                    value: this.props.value,
                    warning: false,
                }));
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState(() => ({value: nextProps.value}));
        }
    }
    inputClass() {
        let className = "form-control";
        if (this.state.warning) {
            className += " warning"
        }
        return className;
    }
    render () {
        return (
            <input
                type="number"
                className={this.inputClass()}
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
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.string,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    decimalPlaces: PropTypes.number,
};

export default Input;