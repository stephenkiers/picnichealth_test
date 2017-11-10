import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from "./components/Input";

class SnomedCtConceptInput extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            open: false,
        }
    }
    render () {
        return (
            <Input
                id="SnomedCtConceptInput"
                tabIndex={this.props.tabIndex}
                label="SNOMED CT Code"
                value={this.props.value}
                onChange={this.props.onChange}
            />
        );
    }
}

SnomedCtConceptInput.defaultProps = {
};
SnomedCtConceptInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    tabIndex: PropTypes.number.isRequired,
};

export default SnomedCtConceptInput;