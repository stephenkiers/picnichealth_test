import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

class SnomedCtConceptAutocomplete extends Component {
    render () {
        return (
            <div className="snomed-autocomplete-dropdown">
                I am a autocomplete section
            </div>
        );
    }
}

SnomedCtConceptAutocomplete.defaultProps = {
};
SnomedCtConceptAutocomplete.propTypes = {
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(SnomedCtConceptAutocomplete);