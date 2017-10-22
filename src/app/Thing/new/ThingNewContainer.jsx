import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import {thingUpsert} from "../actions";
import ThingNew from "./ThingNew";

class ThingNewContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.onSubmit = new_name => {
            this.props.thingUpsert(new_name);
        };
    }
    render () {
        return (
            <ThingNew
                onSubmit={this.onSubmit}
            />
        )
    }
}

ThingNewContainer.defaultProps = {
};
ThingNewContainer.propTypes = {
};

const mapStateToProps = (state, ownProps) => ({
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    thingUpsert(name) {
        dispatch(thingUpsert(undefined, name));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ThingNewContainer)