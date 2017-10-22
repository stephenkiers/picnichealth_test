import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Thing from "./Thing";
import {getThing} from "../../reducers";


class ThingContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {thing} = this.props;
        return (
            <Thing
                id={thing.get('id')}
                thing={thing}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ThingContainer)
