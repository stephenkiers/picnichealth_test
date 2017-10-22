import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import NewRecordButton from "./NewRecordButton";
import {reduxAppStateSetModalId} from "../../AppState/actions";
import {generateRandomUUID} from "../../utils";


class NewRecordButtonContainer extends Component {
    constructor(props) {
        super(props)

        this.onClick = e => {
            e.preventDefault();
            this.props.setModalId(generateRandomUUID())
        }
    }
    render() {
        return (
            <NewRecordButton
                onClick={this.onClick}
            />
        )
    }
}
NewRecordButtonContainer.defaultProps = {
};
NewRecordButtonContainer.propTypes = {
}


const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    setModalId(id) {
        dispatch(reduxAppStateSetModalId(id))
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(NewRecordButtonContainer)