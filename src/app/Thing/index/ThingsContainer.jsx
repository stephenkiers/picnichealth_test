import React, {Component} from 'react'
import { connect } from 'react-redux'
import Records from "./Things";
import {getRecords} from "../../reducers";
import {apiRecordGetLatest} from "../actions";


class RecordsContainer extends Component {
    constructor(props) {
        super(props);
        if (props.things.size === 0) {
            props.apiRecordGetLatest()
        }
    }

    render() {
        return (
            <Records
                records={this.props.things}
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