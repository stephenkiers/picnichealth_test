import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetConcept from "../../getters/GetConcept";
import HierarchyNode from "./HierarchyNode";
import HierarchyChildren from "./HierarchyChildren";

class HierarchyList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current_id: undefined,
        };
    }
    componentWillReceiveProps(nextProps) {

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
                            {concept.get('parentTree') &&
                            concept.get('parentTree').map(id => (
                                <HierarchyNode
                                    key={id}
                                    id={id}
                                    className="hierarchy-parent"
                                />
                            ))}
                            <div>
                                <HierarchyNode
                                    className="hierarchy-current"
                                    id={concept.get("id")}
                                />
                                {concept.get('children')
                                    && (
                                        <div className="hierarchy-children">
                                            <HierarchyChildren id={concept.get('id')} />
                                        </div>
                                )}
                                {concept.get('parentTree')
                                    && <HierarchyChildren id={concept.get('parentTree').last()} />
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

};

export default HierarchyList;