import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetConcept from "../../getters/GetConcept";

class ConceptInformation extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    componentWillReceiveProps(nextProps) {
    }

    render () {
        return (
            <GetConcept
                id={this.props.current_id}
            >
                {concept => {
                    if (!concept) {
                        return <div className="concept-info">loading...</div>;
                    }
                    return (
                        <div className="concept-info">
                            {concept.get('obsolete') && <div className="concept-obsolete">This value is obsolete</div>}
                            <div className="concept-name">
                                {concept.get('name')}
                            </div>
                            {concept.get('semantic_types')
                                && concept.get('semantic_types').size > 0
                                && (
                                    <div className="concept-semantic-types">
                                        <div className="concept-header">
                                            Semantic types
                                        </div>
                                        <div className="concept-results">
                                            {concept.get('semantic_types').map(t => t.get('label')).join(', ')}
                                        </div>
                                    </div>
                                )}
                            {concept.get('alternative_terms')
                                && concept.get('alternative_terms').size > 0
                                && (
                                    <div className="concept-alternative-terms">
                                        <div className="concept-header">
                                            Alternative terms
                                        </div>
                                        <div className="concept-results">
                                            {concept.get('alternative_terms').map(t => t.get('label')).join(', ')}
                                        </div>
                                    </div>
                                )}

                        </div>
                    )
                }}
            </GetConcept>
        );
    }
}

ConceptInformation.defaultProps = {
};
ConceptInformation.propTypes = {
    current_id: PropTypes.number,
};

export default ConceptInformation;