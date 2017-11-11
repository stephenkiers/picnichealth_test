import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetConcept from "../../getters/GetConcept";

class HierarchyNode extends Component {
    render () {
        return (
            <GetConcept id={this.props.id}>
                {concept => {
                    if (!concept) {
                        return <div className="concept-info">loading...</div>;
                    }
                    return (
                        <div
                            className={`hierarchy-node ${this.props.className}`}
                            onClick={this.props.setNewSearchQuery.bind(this, concept.get('id').toString())}
                        >
                            <div className="hierarchy-node-primary">
                                <span className={`glyphicons glyphicons-chevron-${this.props.open ? 'down' : 'right'}`} />
                                <span className="hierarchy-node-name">
                                    {concept.get('name')}
                                </span>
                            </div>
                            <div className="hierarchy-node-secondary">
                                <span className="hierarchy-node-id">
                                    {concept.get('id')}
                                </span>{' '}
                                <span className="hierarchy-node-children-count">
                                    ({concept.get('childrenCount') || 0} children)
                                </span>
                            </div>
                        </div>
                    )
                }}
            </GetConcept>
        );
    }
}

HierarchyNode.defaultProps = {
    className: "",
    current: false,
    open: true,
};
HierarchyNode.propTypes = {
    id: PropTypes.number,
    className: PropTypes.string,
    open: PropTypes.bool,
    setNewSearchQuery: PropTypes.func.isRequired,
};

export default HierarchyNode;