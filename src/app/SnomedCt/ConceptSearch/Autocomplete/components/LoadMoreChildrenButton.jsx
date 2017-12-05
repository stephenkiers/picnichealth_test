import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {OrderedSet} from 'immutable';

const LoadMoreChildrenButton  = ({children, children_count}) => {
    if (children.size === children_count) {
        return null;
    }
    return (
        <div>There are {children_count - children.size} additional children</div>
    )
};

LoadMoreChildrenButton.defaultProps = {
    children: OrderedSet(),
    children_count: 0,
};
LoadMoreChildrenButton.propTypes = {
    children: ImmutablePropTypes.orderedSet,
    children_count: PropTypes.number,
};

export default LoadMoreChildrenButton;