import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import SnomedCtConceptInput from "./SnomedCtConceptInput";
import SnomedCtConceptAutocomplete from "./SnomedCtConceptAutocomplete";

class SnomedCtConceptSearch extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
        };
        this.onInputChange = e => {
            const value = e.target.value;
            this.setState(() => ({value}));
        };
    }
    render () {
        return (
            <div className="snomed-concept-search">
                <SnomedCtConceptInput
                    onChange={this.onInputChange}
                    tabIndex={this.props.tabIndex}
                    value={this.state.value}
                />
                <SnomedCtConceptAutocomplete

                />
            </div>
        );
    }
}

SnomedCtConceptSearch.defaultProps = {
};
SnomedCtConceptSearch.propTypes = {
    tabIndex: PropTypes.number.isRequired,
};
const mapStateToProps = (state, ownProps) => ({
});
const mapDispatchToProps = (dispatch, ownProps) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(SnomedCtConceptSearch);