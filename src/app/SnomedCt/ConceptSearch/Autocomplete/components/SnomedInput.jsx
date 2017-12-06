import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from "./Input";

class SnomedInput extends Component {
    constructor() {
        super();
    }
    render () {
        if (this.props.isFocused) {
            return (
                <Input
                    ref={input => this._input = input}
                    id={this.props.id}
                    tabIndex={this.props.tabIndex}
                    label="SNOMED CT Code"
                    className={`snomed-concept-search-input ${this.props.className}`}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onFocus={this.props.onFocus}
                    onKeyDown={this.props.onKeyDown}
                />
            );
        }
        return (
            <a
                href="javascript:void(0);"
                onClick={this.props.onFocus}
            >
                click me to focus
            </a>
        );
    }
}

SnomedInput.defaultProps = {
};
SnomedInput.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    isFocused: PropTypes.bool,
    value: PropTypes.string,
    tabIndex: PropTypes.number.isRequired,
};

export default SnomedInput;