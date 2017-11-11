import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetConcept from "../../getters/GetConcept";
import HierarchyNode from "./HierarchyNode";
import HierarchyChildren from "./HierarchyChildren";

class HierarchyList extends Component {
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
                            {concept.get('parentTree') &&
                            concept.get('parentTree').map(id => (
                                <HierarchyNode
                                    key={id}
                                    id={id}
                                    className="hierarchy-parent"
                                    setNewSearchQuery={this.props.setNewSearchQuery}
                                />
                            ))}
                            <div>
                                <HierarchyNode
                                    className="hierarchy-current"
                                    id={concept.get("id")}
                                    open={concept.get("childrenCount") > 0}
                                    setNewSearchQuery={this.props.setNewSearchQuery}
                                />
                                {concept.get('children')
                                    && (
                                        <div className="hierarchy-children">
                                            <HierarchyChildren
                                                id={concept.get('id')}
                                                setNewSearchQuery={this.props.setNewSearchQuery}
                                            />
                                        </div>
                                )}
                                {concept.get('parentTree')
                                    && <HierarchyChildren
                                            id={concept.get('parentTree').last()}
                                            setNewSearchQuery={this.props.setNewSearchQuery}
                                        />
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