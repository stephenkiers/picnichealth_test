import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {convertBackToCurrencyFloat, convertToCurrencyInt} from "../../utils";
import {config} from "../../constants";

class Input extends Component {
    constructor(props) {
        super();
        this.onChange = e => {
            const newAmount = parseFloat(e.target.value);
            if (newAmount > 0) {
                this.props.onChange(convertToCurrencyInt(newAmount));
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
                value={convertBackToCurrencyFloat(this.props.value)}
                onChange={this.onChange}
            />
        );
    }
}

Input.defaultProps = {
};
Input.propTypes = {
    id: PropTypes.string.isRequired,
    step: PropTypes.string,
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Input;