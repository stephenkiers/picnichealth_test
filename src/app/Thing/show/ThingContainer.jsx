import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Thing from "./Thing";
import {getThing} from "../../reducers";
import {thingDelete} from "../actions";


class ThingContainer extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = () => {
            this.props.handleDelete();
        }
    }
    render() {
        const {thing} = this.props;
        return (
            <Thing
                id={thing.get('id')}
                thing={thing}
                handleDelete={this.handleDelete}
            />
        )
    }
}
ThingContainer.defaultProps = {
};
ThingContainer.propTypes = {
    thing_id: PropTypes.string.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    thing: getThing(state, ownProps.thing_id),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    handleDelete() {
        dispatch(thingDelete(ownProps.thing_id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ThingContainer)
