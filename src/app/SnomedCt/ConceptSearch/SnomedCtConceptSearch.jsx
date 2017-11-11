import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import SnomedCtConceptAutocomplete from "./Autocomplete/SnomedCtConceptAutocomplete";
import Input from "./Autocomplete/components/Input";

class SnomedCtConceptSearch extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            ddOpen: false,
            currentIndex: 0,
        };
        this.onInputChange = e => {
            const value = e.target.value;
            this.setState(() => ({
                value,
                currentIndex: 0,
            }));
        };
        this.onInputFocus = e => {
            this.setState(() => ({ddOpen: true}));
        };
        this.onInputKeyDown = e => {
            switch(e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    this.setState(state => ({currentIndex: state.currentIndex < 10 ? state.currentIndex + 1 : 10}));
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    this.setState(state => ({currentIndex: state.currentIndex > 0 ? state.currentIndex - 1 : 0}));
                    break;
                // case "ArrowRight":
                //     e.preventDefault();
                //     break;
                // case (e.key.match(/^[A-Za-z0-9]$/) || {} ).input:
                //     e.preventDefault();
                //     this.updateFilterTerm(e.key);
                //     break;
            }
            // console.log(e.key);
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
                    onKeyDown={this.onInputKeyDown}
                />
                {
                    this.state.ddOpen &&
                    <SnomedCtConceptAutocomplete
                        query={this.state.value}
                        currentIndex={this.state.currentIndex}
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