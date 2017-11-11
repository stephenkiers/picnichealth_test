import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetConcept from "../../getters/GetConcept";
import HierarchyParent from "./HierarchyParent";
import HierarchyNode from "./HierarchyNode";

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
                            {concept.get('parentTree') && concept.get('parentTree').map(id => {
                                return <HierarchyParent key={id} id={id} />
                            })}
                            <div>
                                <HierarchyNode
                                    className="hierarchy-current"
                                    id={concept.get("id")}
                                    name={concept.get("name")}
                                    childrenCount={concept.get("childrenCount")}
                                />
                                {
                                    concept.get('children')
                                    && JSON.stringify(concept.get('children'))
                                }
                                {
                                    1 === 3
                                    && concept.get('parentTree')
                                    && concept.get('children')
                                    && JSON.stringify(concept.get('children'))
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