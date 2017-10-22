import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

class Modal extends Component {

    render() {
        return (
            <div className="modal">
                <div className="modal-contents">
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                </div>
                <div className="modal-bg"
                     onClick={this.props.closeModal}
                />
            </div>

        )
    }
}
Modal.defaultProps = {
};
Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
}

export default Modal
