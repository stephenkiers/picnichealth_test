import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {convertBackToCurrencyFloat, convertToCurrencyInt, formatCurrency} from "../../utils";

class Input extends PureComponent {
    constructor() {
        super();
        this.state = {
            value: 0,
            warning: "",
        };
        this.onChange = e => {
            const newAmount = e.target.value ? parseFloat(e.target.value) : 0;
            const convertedValue = convertToCurrencyInt(newAmount);

            this.setState(() => ({value: convertedValue}));
            if (convertedValue <= 0) {
                this.setState(() => ({warning: 'lessThan0'}));
            } else {
                this.props.onChange(convertedValue);
                this.setState(() => ({warning: ""}));
            }
        };
        this.onBlur = () => {
            console.log('blur');
            // if (this.state.value !== this.props.value && this.state.warning) {
                this.setState((state) => ({
                    value: state.warning === "lessThan0" ? 0 : this.formattedCurrency(this.props.value),
                    warning: "",
                }));
            // }
        }
    }
    componentWillMount() {
        this.formattedCurrency(this.props.value);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState(() => ({value: this.formattedCurrency(nextProps.value)}));
        }
    }
    formattedCurrency(value) {
        return formatCurrency(convertBackToCurrencyFloat(value), this.props.decimalPlaces);
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
            <div>
                {this.state.warning && (
                    <div className="warning-message">
                        Your bid must be more than 0.
                    </div>
                )}
                <input
                    type="number"
                    className={this.inputClass()}
                    id={this.props.id}
                    step={this.props.step}
                    value={this.state.value}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                />
            </div>
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