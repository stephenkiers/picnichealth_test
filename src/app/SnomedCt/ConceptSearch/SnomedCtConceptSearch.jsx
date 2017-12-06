import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import SnomedCtConceptAutocomplete from "./Autocomplete/SnomedCtConceptAutocomplete";
import Input from "./Autocomplete/components/Input";
import SnomedInput from "./Autocomplete/components/SnomedInput";

class SnomedCtConceptSearch extends Component {
    constructor() {
        super();
        this.state = {
            ddOpen: false,
            currentIndex: 0,
            shadowId: undefined,
        };
        this.onInputChange = e => {
            const value = e.target.value;
            this.props.onChange(value);
            this.setState(() => ({
                currentIndex: 0,
                shadowId: undefined,
            }));
        };
        this.onInputFocus = e => {
            this.showDd();
            if (this.props.onFocus) {
                this.props.onFocus({target: {id: this.props.id}});
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
            this.props.onChange(query);
            this.setState(() => ({
                currentIndex: 0,
            }))
        };
        this.setNewIndex = i => {
            this.setState(() => ({currentIndex: i}));
        };
        this.setShadowId = id => {
            this.setState(() => ({shadowId: id}));
        };
        this.hideDd = () => {
            const {shadowId} = this.state;
            this.setState(() => ({
                currentIndex: 0,
                shadowId: undefined,
            }));
            if (shadowId) {
                this.props.onChange(shadowId); // set value to current selection on leave
            }
            this.toggleDropDownState(null, null, false);
        };
        this.showDd = () => this.toggleDropDownState(null, null, true);
        this.toggleDropDownState = (proxy=null, event=null, new_state = !this.state.ddOpen) => {
            if (event) {
                event.preventDefault()
            }
            if (new_state === true) {
                // Hide dropdown block on click outside the block
                window.addEventListener('click', this.handleWindowClick);
                this.setState(() => ({ddOpen: true}));
            } else {
                // Remove click event listener on component unmount
                window.removeEventListener('click', this.handleWindowClick);
                this.setState(() => ({ddOpen: false}));
            }
        };
        this.handleWindowClick = (e) => {
            if (
                this._snomedInput !== e.target // not the container
                && !this._snomedInput.contains(e.target) // not a child of the container
                && document.body.contains(e.target) // fix for weird issue where item is removed from document.
                // anything clicked should be a part of the document or else we cannot tell if it is inside or not
            ) {
                this.hideDd();
            } else {
                this._input._input._input.focus();
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        // debugger;
        if (
            prevState.ddOpen !== this.state.ddOpen
            && this.state.ddOpen === true
        ) {
            this._input._input._input.focus();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (
            this.props.currentInputId !== nextProps.currentInputId
            && nextProps.currentInputId !== nextProps.id
        ) {
            this.hideDd();
        }
    }
    componentWillUnmount() {
        if (this.state.open) {
            window.removeEventListener('click', this.handleWindowClick);
        }
    }
    render () {
        const value = this.props.value ? this.props.value.toString() : undefined;
        return (
            <div
                className="snomed-concept-search"
                ref={snomedInput => this._snomedInput = snomedInput}
            >
                <SnomedInput
                    id={this.props.id}
                    tabIndex={this.props.tabIndex}
                    value={value}
                    onChange={this.onInputChange}
                    onFocus={this.onInputFocus}
                    onKeyDown={this.onInputKeyDown}
                    isFocused={this.state.ddOpen}
                    ref={input => this._input = input}
                />
                {
                    this.props.value
                    && this.state.ddOpen
                    && <SnomedCtConceptAutocomplete
                        query={value}
                        currentIndex={this.state.currentIndex}
                        setNewIndex={this.setNewIndex}
                        setNewSearchQuery={this.setNewSearchQuery}
                        setShadowId={this.setShadowId}
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
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    currentInputId: PropTypes.string,
};
const mapStateToProps = (state, ownProps) => ({
});
const mapDispatchToProps = (dispatch, ownProps) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(SnomedCtConceptSearch);