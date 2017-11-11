import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetConcept from "../../getters/GetConcept";
import HierarchyNode from "./HierarchyNode";

class HierarchyChildren extends Component {
    render () {
        return (
            <GetConcept
                id={this.props.id}
            >
                {concept => {
                    if (!concept.get('children') || concept.get('children').size < 1) {
                        return null;
                    }
                    return (
                        <div>
                            {concept.get('children').map(child_id => (
                                <HierarchyNode
                                    id={child_id}
                                    key={child_id}
                                    open={false}
                                    setNewSearchQuery={this.props.setNewSearchQuery}
                                />
                            ))}
                        </div>
                    )
                }}
            </GetConcept>
        );
    }
}

HierarchyChildren.defaultProps = {
};
HierarchyChildren.propTypes = {
    id: PropTypes.number.isRequired,
    setNewSearchQuery: PropTypes.func.isRequired,
};

export default HierarchyChildren;