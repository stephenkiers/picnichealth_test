import React, {Component} from 'react'
import { connect } from 'react-redux'
import Records from "./Records";
import {getRecords} from "../../reducers";
import {apiRecordGetLatest} from "../actions";


class RecordsContainer extends Component {
    constructor(props) {
        super(props);
        if (props.records.size === 0) {
            props.apiRecordGetLatest()
        }
    }

    render() {
        return (
            <Records
                records={this.props.records}
            />
        )
    }
}
RecordsContainer.defaultProps = {
};
RecordsContainer.propTypes = {
}


const mapStateToProps = (state, ownProps) => ({
    records: getRecords(state),
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    apiRecordGetLatest() {
        dispatch(apiRecordGetLatest())
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(RecordsContainer)