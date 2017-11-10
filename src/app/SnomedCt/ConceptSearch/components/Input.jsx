import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
    constructor() {
        super();
        // this.state = {
        //     focus: false
        // };
        this.onChange = e => {
            if (typeof this.props.onChange === "function") {
                this.props.onChange(e);
            }
        };
        this.onKeyDown = e => {
            if (typeof this.props.onKeyDown === "function") {
                this.props.onKeyDown(e);
            }
        };
        this.onKeyUp = e => {
            if (typeof this.props.onKeyUp === "function") {
                this.props.onKeyUp(e);
            }
        };
        this.onBlur = e => {
            // this.setState(() => ({focus: false}));
            if (typeof this.props.onBlur === "function") {
                this.props.onBlur();
            }
        };
        this.onFocus = e => {
            this.setState(() => ({focus: true}));
            if (typeof this.props.onFocus === "function") {
                this.props.onFocus();
            }
        };
    }
    render() {
        return (
            <div className={`form-group ${this.props.className}`}>
                <label htmlFor="exampleFormControlInput1">
                    {this.props.label}
                </label>
                <input type={ typeof this.props.input_type === "undefined" ? "text" : this.props.input_type}
                       id={this.props.id}
                       className="form-control"
                       value={ this.props.value ? this.props.value : "" }
                       onChange={this.onChange}
                       onKeyDown={this.onKeyDown}
                       onKeyUp={this.onKeyUp}
                       onFocus={this.onFocus}
                       onBlur={this.onBlur}
                       placeholder={ this.props.placeholder }
                       required={ this.props.required }
                       tabIndex={this.props.tabIndex}
                       autoComplete={ this.props.autocomplete }
                       autoFocus={this.props.autoFocus}
                />
            </div>
        )
    }
}

Input.defaultProps = {
    label: "",
    placeholder: "",
    required: false,
    has_validation: false,
    valid: true,
    autoFocus: false,
    className: "",
};

Input.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    required: PropTypes.bool,
    has_validation: PropTypes.bool,
    input_type: PropTypes.string,
    value: PropTypes.string,
    tabIndex: PropTypes.number.isRequired,
    autoFocus: PropTypes.bool,
    // initialValue: PropTypes.string.isRequired,
    // placeholder_text: PropTypes.string.isRequired,
    // onBlur: PropTypes.func.isRequired
};

export default Input;