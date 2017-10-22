import React, {Component} from 'react';
import { connect } from 'react-redux';
import {default_record} from "../record_reducers";
import {getModalId, getRecord} from "../../reducers";
import UpdateRecordModal from "./UpdateRecordModal";
import {apiRecordUpdate} from "../actions";

class UpdateRecordModalContainer extends Component {

    render() {
        const {modal_id, edit_record} = this.props;
        if (!modal_id) {
            return null
        }
        return (
            <UpdateRecordModal
                id={modal_id}
                first_name={edit_record.get('first_name')}
                last_name={edit_record.get('last_name')}
                phone_number={edit_record.get('phone_number')}
                created_at={edit_record.get('created_at')}
                state={edit_record.get('state')}
                onSave={this.props.onSave}
            />
        )
    }
}
UpdateRecordModalContainer.defaultProps = {
    edit_record: default_record
};
UpdateRecordModalContainer.propTypes = {
}

const mapStateToProps = (state, ownProps) => {
    const modal_id = getModalId(state);
    return {
        modal_id,
        edit_record: getRecord(state, modal_id),
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSave(id, first_name, last_name, phone_number, created_at) {
        dispatch(apiRecordUpdate(id, first_name, last_name, phone_number, created_at))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRecordModalContainer)
