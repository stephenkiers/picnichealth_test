import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

class Input extends Component {
    render () {
        return (
            <input
                type="number"
                className="form-control"
                id={this.props.id}
                step={this.props.step}
                value={this.props.value}
                onChange={this.props.onChange}
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