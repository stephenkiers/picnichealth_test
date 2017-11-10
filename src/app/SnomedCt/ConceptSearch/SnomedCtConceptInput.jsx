import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

class SnomedCtConceptInput extends Component {

    render () {
        return (
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">SNOMED CT Code</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
        );
    }
}

SnomedCtConceptInput.defaultProps = {
};
SnomedCtConceptInput.propTypes = {
};

export default SnomedCtConceptInput;