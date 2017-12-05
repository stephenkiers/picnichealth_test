import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from "./Input";

class SnomedInput extends Component {
    constructor() {
        super();
    }
    render () {
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
}

SnomedInput.defaultProps = {
};
SnomedInput.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.string,
    tabIndex: PropTypes.number.isRequired,
};

export default SnomedInput;