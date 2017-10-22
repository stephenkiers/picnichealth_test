import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {formatTelephoneNumber} from "../../utils";


class Record extends Component {

    render() {
        return (
            <div className="record clearfix">
                <div className="pull-left">
                    <strong className="last-name">
                        {this.props.last_name},{' '}
                    </strong>
                    <span className="first-name">
                            {this.props.first_name}
                        </span>
                    <a href={`tel:${this.props.phone_number}`} className="phone-number">
                        {formatTelephoneNumber(this.props.phone_number)}
                    </a>
                </div>
                <div className="pull-right">
                    <a
                        href="javascript:void(0);"
                        className="btn"
                        onClick={this.props.onUpdateClick}
                    >
                        Update
                    </a>
                    <a
                        href="javascript:void(0);"
                        className="btn btn-danger"
                        onClick={this.props.onDelete}
                    >
                        Delete
                    </a>
                </div>
            </div>

        )
    }
}
Record.defaultProps = {
};
Record.propTypes = {
    id: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    onUpdateClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
}

export default Record
