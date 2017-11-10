import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import SnomedCtConceptInput from "./SnomedCtConceptInput";

class SnomedCtConceptSearch extends Component {

    constructor() {
        super();
        this.state = {
            value: '',
        };
        this.onInputChange = e => {
            const value = e.target.value;
            this.setState(() => ({value}))
        };
    }

    render () {
        return (
            <SnomedCtConceptInput
                onChange={this.onInputChange}
                tabIndex={this.props.tabIndex}
                value={this.state.value}
            />
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