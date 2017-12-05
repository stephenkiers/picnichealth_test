import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {connect} from 'react-redux'
import {OrderedSet, Set} from 'immutable';
import {snomedGetChildren} from "../../../server_actions";
import {getConcept} from "../../../../reducers";


class LoadMoreChildrenButton extends Component {
    constructor() {
        super();
        this.onClick = () => {
            const newParentTree = this.props.concept.get('parentTree').add(this.props.concept.get('id'));
            this.props.snomedGetChildren(
                newParentTree,
                this.props.concept.get('children').size
            );
        };
    }
    render () {
        const {concept} = this.props;
        if (!concept || !concept.get('children')) {
            return null;
        }
        const childrenSize = concept.get('children').size;
        const childrenCount = concept.get('childrenCount');
        if (childrenSize === childrenCount) {
            return null;
        }
        return (
            <a
                href="javascript:void(0);"
                onClick={this.onClick}
            >
                There are {childrenCount - childrenSize} additional children
            </a>
        )
    }
}

LoadMoreChildrenButton.defaultProps = {
};
LoadMoreChildrenButton.propTypes = {
    conceptId: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    concept: getConcept(state, ownProps.conceptId),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    snomedGetChildren(parentTree, start) {
        dispatch(snomedGetChildren(parentTree, start))
    },
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(LoadMoreChildrenButton);