import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import {snomedGetChildren} from "../../server_actions";

class GetChildren extends PureComponent {
    componentDidMount() {
        const {concept} = this.props;
        if (
            concept.get('childrenCount') > 0
            && !concept.get('children')
        ) {
            // console.log("Save the children!");
            this.props.snomedGetChildren();
        }
    }
    render () {
        return null;
    }
}

GetChildren.defaultProps = {
};
GetChildren.propTypes = {
    concept: ImmutablePropTypes.map.isRequired,
};
// const mapStateToProps = (state, ownProps) => ({
// });
const mapDispatchToProps = (dispatch, ownProps) => ({
    snomedGetChildren() {
        dispatch(snomedGetChildren(ownProps.concept.get('id'), ownProps.concept.get('parentTree')));
    }
});
export default connect(undefined, mapDispatchToProps)(GetChildren);