import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux'
import {OrderedSet, Set} from 'immutable';
import {snomedGetChildren} from "../../../server_actions";


class LoadMoreChildrenButton extends Component {
    constructor() {
        super();
        this.onClick = () => {
            this.props.snomedGetChildren(this.props.children.size);
        };
    }
    render () {
        const {children, children_count} = this.props;
        if (children.size === children_count) {
            return null;
        }
        return (
            <a
                href="javascript:void(0);"
                onClick={this.onClick}
            >
                There are {children_count - children.size} additional children
            </a>
        )
    }
}

LoadMoreChildrenButton.defaultProps = {
    children: OrderedSet(),
    children_count: 0,
};
LoadMoreChildrenButton.propTypes = {
    parentTree: ImmutablePropTypes.orderedSet,
    children: ImmutablePropTypes.orderedSet,
    children_count: PropTypes.number,
};

// const mapStateToProps = (state, ownProps) => ({
// });

const mapDispatchToProps = (dispatch, ownProps) => ({
    snomedGetChildren(start) {
        dispatch(snomedGetChildren(ownProps.parentTree, start))
    },
});

export default connect(
    undefined, mapDispatchToProps
)(LoadMoreChildrenButton);