import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetConcept from "../../getters/GetConcept";

class TermLink extends  PureComponent {
    constructor(props) {
        super(props);
        this.onClick = e => {
            this.props.setNewSearchQuery(this.props.term);
        };
    }
    render () {
        return (
            <div>
                <a
                    href="javscript:void(0)"
                    onClick={this.onClick}
                    className="concept-alternative-term-link"
                >
                    {this.props.term}
                </a>
            </div>
        )
    }
}

class ConceptInformation extends Component {
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
                                        <div className="concept-body">
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
                                        <div className="concept-body">
                                            {concept.get('alternative_terms').map(term => {
                                                return <TermLink
                                                    key={term.hashCode()}
                                                    setNewSearchQuery={this.props.setNewSearchQuery}
                                                    term={term.get('label')}
                                                />
                                            })}
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
    setNewSearchQuery: PropTypes.func.isRequired,
};

export default ConceptInformation;