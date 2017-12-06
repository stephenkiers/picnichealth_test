import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from "./Input";
import GetConcept from "../../getters/GetConcept";

const snomedLabel = "SNOMED CT Code";

const Basic = () => (
    <div className="form-group">
        <label htmlFor="exampleFormControlInput1">
            {snomedLabel}
        </label>
        <div className="snomed-input-card blank">
            <div className="snomed-input-card-primary">
                <span className="snomed-input-card-name">
                    <span className="glyphicons glyphicons-search" />
                    Click to search
                </span>
            </div>
        </div>
    </div>
);

class SnomedInput extends Component {
    render () {
        if (this.props.isFocused) {
            return (
                <Input
                    ref={input => this._input = input}
                    id={this.props.id}
                    tabIndex={this.props.tabIndex}
                    label={snomedLabel}
                    className={`snomed-concept-search-input ${this.props.className}`}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    onFocus={this.props.onFocus}
                    onKeyDown={this.props.onKeyDown}
                />
            );
        }
        return (
            <a
               href="javascript:void(0);"
               onClick={this.props.onFocus}
               className="block-link"
           >
                {isNaN(parseInt(this.props.value)) ? (
                    <Basic />
                ) : (
                    <GetConcept id={parseInt(this.props.value)}>
                        {(concept) => {
                            if (!concept) {
                                return <Basic />
                            }
                            return (
                                <div className={`form-group ${this.props.className}`}>
                                    <label htmlFor="exampleFormControlInput1">
                                        {snomedLabel}
                                    </label>
                                    <div className="snomed-input-card">
                                        <div className="snomed-input-card-primary">
                                            <span className="snomed-input-card-name">
                                                {concept.get('name')}
                                            </span>
                                        </div>
                                        <div className="snomed-input-card-secondary">
                                            <span className="snomed-input-card-id">
                                                {concept.get('id')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }}
                    </GetConcept>
                )}
            </a>
        );
    }
}

SnomedInput.defaultProps = {
};
SnomedInput.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    isFocused: PropTypes.bool,
    value: PropTypes.string,
    tabIndex: PropTypes.number.isRequired,
};

export default SnomedInput;