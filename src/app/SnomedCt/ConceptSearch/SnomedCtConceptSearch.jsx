import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import SnomedCtConceptInput from "./SnomedCtConceptInput";

class SnomedCtConceptSearch extends Component {

    render () {
        return (
            <SnomedCtConceptInput />
        );
    }
}

SnomedCtConceptSearch.defaultProps = {
};
SnomedCtConceptSearch.propTypes = {
};
const mapStateToProps = (state, ownProps) => ({
});
const mapDispatchToProps = (dispatch, ownProps) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(SnomedCtConceptSearch);