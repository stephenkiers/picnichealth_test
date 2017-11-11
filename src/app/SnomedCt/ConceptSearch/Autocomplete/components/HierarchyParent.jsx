import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetConcept from "../../getters/GetConcept";
import HierarchyNode from "./HierarchyNode";

class HierarchyParent extends Component {
    render () {
        console.log(this.props.id);
        return (
            <GetConcept id={this.props.id}>
                {concept => {
                    if (!concept) {
                        return <div className="concept-info">loading...</div>;
                    }
                    return (
                        <HierarchyNode
                            className="hierarchy-parent"
                            id={concept.get("id")}
                            name={concept.get("name")}
                            childrenCount={concept.get("childrenCount")}
                        />
                    )
                }}
            </GetConcept>
        );
    }
}

HierarchyParent.defaultProps = {
};
HierarchyParent.propTypes = {
    id: PropTypes.number.isRequired,
};

export default HierarchyParent;