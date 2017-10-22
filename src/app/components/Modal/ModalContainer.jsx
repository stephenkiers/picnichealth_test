import React, {Component} from 'react';
import { connect } from 'react-redux';
import Modal from "./Modal";
import {reduxAppStateSetModalId} from "../../AppState/actions";

class ModalContainer extends Component {

    componentDidMount() {
        window.addEventListener("keydown", this.handleEscapeKeyPress.bind(this), false);
    }
    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleEscapeKeyPress.bind(this), false);
    }
    handleEscapeKeyPress(e) {
        if(e.keyCode === 27) {
            this.props.closeModal();
        }
    }

    render() {
        return (
            <Modal
                closeModal={this.props.closeModal}
            >
                {this.props.children}
            </Modal>
        )
    }
}
ModalContainer.defaultProps = {
};
ModalContainer.propTypes = {
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    closeModal() {
        dispatch(reduxAppStateSetModalId(undefined));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer);
