import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import SnomedCtConceptAutocomplete from "./SnomedCtConceptAutocomplete";
import Input from "./components/Input";

class SnomedCtConceptSearch extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            ddOpen: false,
        };
        this.onInputChange = e => {
            const value = e.target.value;
            this.setState(() => ({value}));
        };
        this.onInputFocus = e => {
            this.setState(() => ({ddOpen: true}));
        };
        this.onInputBlur = e => {
            if (this.state.value.length === 0) {
                this.setState(() => ({ddOpen: false}));
            }
        };
    }
    render () {
        return (
            <div className="snomed-concept-search">
                <Input
                    id="SnomedCtConceptInput"
                    tabIndex={this.props.tabIndex}
                    label="SNOMED CT Code"
                    className="snomed-concept-search-input"
                    value={this.state.value}
                    onChange={this.onInputChange}
                    onBlur={this.onInputBlur}
                    onFocus={this.onInputFocus}
                />
                {
                    this.state.ddOpen &&
                    <SnomedCtConceptAutocomplete
                        query={this.state.value}
                    />
                }
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