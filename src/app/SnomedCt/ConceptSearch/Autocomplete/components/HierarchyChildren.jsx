import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import HierarchyNode from "./HierarchyNode";
import {snomedGetChildren} from "../../../server_actions";

class HierarchyChildren extends Component {
    componentDidMount() {
        this.checkAndGetChildren(this.props.concept)
    }
    componentWillReceiveProps(nextProps) {
        const {concept} = nextProps
        if (!concept.equals(this.props.concept)) {
            this.checkAndGetChildren(concept)
        }
    }
    checkAndGetChildren(concept) {
        if (
            concept.get('childrenCount') > 0
            && !concept.get('children')
        ) {
            // console.log("Save the children!", concept.get('parentTree').toJS(), concept.get('id'));
            const parentTree = concept.get('parentTree').add(concept.get('id'));
            this.props.snomedGetChildren(parentTree);
        }
    }
    render () {
        const {concept} = this.props;
        if (!concept.get('children') || concept.get('children').size < 1) {
            return null;
        }
        return (
            <div>
                {concept.get('children').map(child_id => {
                    if (child_id === this.props.skip) {
                        return null
                    }
                    return (
                        <HierarchyNode
                            id={child_id}
                            key={child_id}
                            open={false}
                            setNewSearchQuery={this.props.setNewSearchQuery}
                        />
                    );
                })}
            </div>
        )
    }
}

HierarchyChildren.defaultProps = {
    skip: 0,
};
HierarchyChildren.propTypes = {
    concept: ImmutablePropTypes.map.isRequired,
    setNewSearchQuery: PropTypes.func.isRequired,
    skip: PropTypes.number,
};
// const mapStateToProps = (state, ownProps) => ({
// });
const mapDispatchToProps = (dispatch, ownProps) => ({
    snomedGetChildren(parentTree) {
        dispatch(snomedGetChildren(parentTree));
    }
});

export default connect(undefined, mapDispatchToProps)(HierarchyChildren);