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
            value: '408739003',
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
            this.showDd();
            if (this.props.onFocus) {
                this.props.onFocus(e);
            }
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
        this.setNewSearchQuery = query => {
            this.setState(() => ({
                value: query,
                currentIndex: 0,
            }))
        };
        this.setNewIndex = i => {
            this.setState(() => ({currentIndex: i}));
        };
        this.toggleDropDownState = (proxy=null, event=null, new_state = !this.state.ddOpen) => {
            if (event) {
                event.preventDefault()
            }
            if (new_state === true) {
                // Hide dropdown block on click outside the block
                window.addEventListener('click', this.handleWindowClick);
                // console.log('added listener')
                this.setState(() => ({ddOpen: true}));
            } else {
                // Remove click event listener on component unmount
                window.removeEventListener('click', this.handleWindowClick);
                // console.log('removed listener')
                this.setState(() => ({ddOpen: false}));
            }
        };
        this.hideDd = () => this.toggleDropDownState(null, null, false);
        this.showDd = () => this.toggleDropDownState(null, null, true);
        this.handleWindowClick = (e) => {
            console.log(this);
            this._input._input.focus();
            if (
                this._snomedInput !== e.target // not the container
                && !this._snomedInput.contains(e.target) // not a child of the container
                && document.body.contains(e.target) // fix for weird issue where item is removed from document.
                // anything clicked should be a part of the document or else we cannot tell if it is inside or not
            ) {
                this.hideDd();
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.currentInputId !== nextProps.id) {
            this.hideDd();
        }
    }
    componentWillUnmount() {
        if (this.state.open) {
            // console.log('removed listener')
            window.removeEventListener('click', this.handleWindowClick);
        }
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.value !== this.state.value) {
    //         this.input.input.focus();
    //     }
    // }
    render () {
        return (
            <div
                className="snomed-concept-search"
                ref={snomedInput => this._snomedInput = snomedInput}
            >
                <Input
                    id={this.props.id}
                    tabIndex={this.props.tabIndex}
                    label="SNOMED CT Code"
                    className="snomed-concept-search-input"
                    value={this.state.value}
                    onChange={this.onInputChange}
                    onFocus={this.onInputFocus}
                    onKeyDown={this.onInputKeyDown}
                    ref={input => this._input = input}
                />
                {
                    this.state.ddOpen &&
                    <SnomedCtConceptAutocomplete
                        query={this.state.value}
                        currentIndex={this.state.currentIndex}
                        setNewIndex={this.setNewIndex}
                        setNewSearchQuery={this.setNewSearchQuery}
                    />
                }
            </div>
        );
    }
}

SnomedCtConceptSearch.defaultProps = {
};
SnomedCtConceptSearch.propTypes = {
    id: PropTypes.string.isRequired,
    tabIndex: PropTypes.number.isRequired,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    currentInputId: PropTypes.string,
};
const mapStateToProps = (state, ownProps) => ({
});
const mapDispatchToProps = (dispatch, ownProps) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(SnomedCtConceptSearch);