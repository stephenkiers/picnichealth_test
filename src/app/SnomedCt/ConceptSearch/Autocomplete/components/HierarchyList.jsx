import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetConcept from "../../getters/GetConcept";
import HierarchyNode from "./HierarchyNode";
import HierarchyChildren from "./HierarchyChildren";
import LoadMoreChildrenButton from "./LoadMoreChildrenButton";

class HierarchyList extends Component {
    constructor() {
      super();
      this.state = {
          levels_to_show: 2,
      };
      this.expandParent = () => {
          this.setState({levels_to_show: 999});
      };
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.current_id !== this.props.current_id) {
            this.setState({levels_to_show: 2});
        }
    }

    expandParentsButton(concept) {
        const parent_tree = concept.get('parentTree');
        if (
            !parent_tree
            || parent_tree.size === 0
            || parent_tree.size <= this.state.levels_to_show
        ) {
            return null
        }
        return (
            <a
                href="javascript:void(0);"
                onClick={this.expandParent}
                className="hierarchy-link"
            >
                &hellip; expand {parent_tree.size - this.state.levels_to_show} parents
            </a>
        )
    }
    showParents(concept) {
        let parent_tree = concept.get('parentTree');
        if (
            !parent_tree
            || parent_tree.size === 0
        ) {
           return null;
        }
        if (parent_tree.size > this.state.levels_to_show) {
            parent_tree = parent_tree.slice(this.state.levels_to_show * -1)
        }
        return parent_tree.map(id => (
            <HierarchyNode
                key={id}
                id={id}
                className="hierarchy-parent"
                setNewSearchQuery={this.props.setNewSearchQuery}
            />
        ));
    }

    render () {
        const {current_id} = this.props;
        if (!current_id) {
            return <div />
        }
        return (
            <GetConcept
                id={this.props.current_id}
            >
                {concept => {
                    if (!concept) {
                        return <div className="concept-info">loading...</div>;
                    }
                    return (
                        <div className="concept-hierarchy">

                            {this.expandParentsButton(concept)}
                            {this.showParents(concept)}
                            <div>
                                <HierarchyNode
                                    className="hierarchy-current"
                                    id={concept.get("id")}
                                    open={concept.get("childrenCount") > 0}
                                    setNewSearchQuery={this.props.setNewSearchQuery}
                                    current={true}
                                />
                                {concept.get('childrenCount') > 0
                                    && (
                                        <div className="hierarchy-children">
                                            <HierarchyChildren
                                                concept={concept}
                                                setNewSearchQuery={this.props.setNewSearchQuery}
                                            />
                                            <LoadMoreChildrenButton
                                                parentTree={concept.get('parentTree').add(concept.get('id'))}
                                                children_count={concept.get('childrenCount')}
                                                children={concept.get('children')}
                                            />
                                        </div>
                                )}
                                {concept.get('parentTree')
                                    && concept.get('parentTree').size > 0
                                    && <GetConcept
                                            id={concept.get('parentTree').last()}
                                        >
                                            {parentConcept =>
                                                <div>
                                                    <HierarchyChildren
                                                        concept={parentConcept}
                                                        setNewSearchQuery={this.props.setNewSearchQuery}
                                                        skip={concept.get('id')}
                                                    />
                                                    <LoadMoreChildrenButton
                                                        parentTree={parentConcept.get('parentTree').add(parentConcept.get('id'))}
                                                        children_count={parentConcept.get('childrenCount')}
                                                        children={parentConcept.get('children')}
                                                    />
                                                </div>
                                            }
                                        </GetConcept>
                                }
                            </div>
                        </div>
                    )}}
            </GetConcept>
        );
    }
}

HierarchyList.defaultProps = {
};
HierarchyList.propTypes = {
    current_id: PropTypes.number,
    setNewSearchQuery: PropTypes.func.isRequired,
};

export default HierarchyList;