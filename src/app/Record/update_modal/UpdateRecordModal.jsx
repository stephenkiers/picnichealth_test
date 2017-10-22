import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ModalContainer from "../../components/Modal/ModalContainer";
import TextInput from "./components/TextInput";
import TelephoneInput from "./components/TelephoneInput";

class UpdateRecordModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: props.first_name,
            last_name: props.last_name,
            phone_number: props.phone_number,
            valid: false,
        };
        this.onChangeFirstName = new_value => {
            this.setState({
                first_name: new_value
            });
        };
        this.onChangeLastName = new_value => {
            this.setState({
                last_name: new_value
            });
        };
        this.onChangePhoneNumber = new_value => {
            this.setState({
                phone_number: new_value
            });
        };
        this.onSave = e => {
            e.preventDefault();
            // id, first_name, last_name, phone_number, created_at
            if (this.isFormValid()) {
                this.props.onSave(
                    this.props.id,
                    this.state.first_name,
                    this.state.last_name,
                    this.state.phone_number,
                    this.props.created_at ? this.props.created_at : (new Date).getTime(),
                )
            } else {
                console.log('form not valid')
            }
        };
        this.isFormValid = () => {
            console.log('check valid');
            return this.state.first_name.length > 0
                && this.state.last_name.length > 0
                && this.state.phone_number.length === 10
        }
    }

    render() {
        const {first_name, last_name, phone_number} = this.state;

        if (this.props.state === "saving") {
            return (
                <ModalContainer>
                    <div className="text-center">
                        Saving...
                    </div>
                </ModalContainer>
            )
        }

        return (
            <ModalContainer>
                <form
                    onSubmit={this.onSave}

                >
                    <TextInput
                        id="first_name"
                        label="First name"
                        value={first_name}
                        onChange={this.onChangeFirstName}
                        tab_index={0}
                    />
                    <TextInput
                        id="last_name"
                        label="Last name"
                        value={last_name}
                        onChange={this.onChangeLastName}
                        tab_index={1}
                    />
                    <TelephoneInput
                        id="phone_number"
                        label="Phone number"
                        value={phone_number}
                        onChange={this.onChangePhoneNumber}
                        tab_index={2}
                    />
                    <button
                        type="submit"
                        className="btn"
                        disabled={!this.isFormValid()}
                    >
                        Save changes
                    </button>
                </form>
            </ModalContainer>

        )
    }
}
UpdateRecordModal.defaultProps = {
};
UpdateRecordModal.propTypes = {
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    phone_number: PropTypes.string,
    created_at: PropTypes.number,
    onSave: PropTypes.func.isRequired,
}

export default UpdateRecordModal
