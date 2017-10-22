import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Record from "./Record";
import {reduxAppStateSetModalId} from "../../AppState/actions";
import {apiRecordDelete} from "../actions";


class RecordContainer extends Component {
    constructor(props) {
        super(props);
        this.onDelete = () => {
            if (confirm("Are you sure you want to delete this record?")) {
                this.props.deleteRecord(this.props.record.get('id'));
            }
        }
        this.onUpdateClick = () => {
            this.props.setModalId(this.props.record.get('id'));
        }
    }
    render() {
        const {record} = this.props;
        const state = record.get('state')

        if (state !== 'idle') {
            if (state === 'deleting') {
                return (
                    <div className="record record-delete clearfix">
                        <strong>Deleting...</strong>
                    </div>
                )
            }
            return (
                <div className="record clearfix">
                    <strong>Saving...</strong>
                </div>
            )
        }
        return (
            <Record
                id={record.get('id')}
                first_name={record.get('first_name')}
                last_name={record.get('last_name')}
                phone_number={record.get('phone_number')}
                onUpdateClick={this.onUpdateClick}
                onDelete={this.onDelete}

                created_at={record.get('created_at')}
            />
        )
    }
}
RecordContainer.defaultProps = {
};
RecordContainer.propTypes = {
    record: ImmutablePropTypes.map.isRequired,
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setModalId(id) {
        dispatch(reduxAppStateSetModalId(id))
    },
    deleteRecord(id) {
        dispatch(apiRecordDelete(id))
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(RecordContainer)
