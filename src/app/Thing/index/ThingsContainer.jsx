import React, {Component} from 'react'
import { connect } from 'react-redux'
import Things from "./Things";
import {getArrayOfThingIds} from "../../reducers";

class ThingsContainer extends Component {
    render() {
        return (
            <Things
                thing_ids={this.props.thing_ids}
            />
        )
    }
}
ThingsContainer.defaultProps = {
};
ThingsContainer.propTypes = {
};


const mapStateToProps = (state, ownProps) => ({
    thing_ids: getArrayOfThingIds(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ThingsContainer)