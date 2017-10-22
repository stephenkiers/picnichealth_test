import React, {Component} from 'react'
import PropTypes from 'prop-types'


class NewRecordButton extends Component {
    render() {
        return (
            <a
                href="javascript:void(0);"
                className="btn mob-block mob-text-center"
                onClick={this.props.onClick}
            >
                New
            </a>
        )
    }
}
NewRecordButton.defaultProps = {
};
NewRecordButton.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default NewRecordButton