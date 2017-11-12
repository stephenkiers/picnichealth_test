import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import AutocompleteResultsList from "./components/AutocompleteResultsList";
import GetMatchingResults from "../getters/GetMatchingResults";
import HierarchyList from "./components/HierarchyList";
import ConceptInformation from "./components/ConceptInformation";

const getCurrentNodeId = (results, i) => {
    if (!results || results.get('totalCount') === 0) {
        return undefined;
    }
    if (i > results.get('totalCount')) {
        i = results.get('totalCount');
    }
    return parseInt(results.get('results')._list.get(i)[1].get('id'));
};

class SnomedCtConceptAutocomplete extends Component {
    render () {
        return (
            <div className="snomed-autocomplete-dropdown">
                <div className="internal-container">
                    <GetMatchingResults query={this.props.query}>
                        {autocompleteResults => {
                            const current_id = getCurrentNodeId(autocompleteResults, this.props.currentIndex);
                            if (!autocompleteResults || autocompleteResults.get('state') === "init") {
                                return <div>Searching</div>
                            }
                            if (autocompleteResults.get('totalCount') === 0) {
                                return <div>No results.</div>
                            }
                            return (
                                <div className="d-flex align-items-stretch">
                                    <div className="col-autocomplete">
                                        <AutocompleteResultsList
                                            query={this.props.query}
                                            currentIndex={this.props.currentIndex}
                                            autocompleteResults={autocompleteResults}
                                            setNewIndex={this.props.setNewIndex}
                                            setShadowId={this.props.setShadowId}
                                        />
                                    </div>
                                    <div className="col-heirarchy">
                                        {current_id &&
                                            <HierarchyList
                                                current_id={current_id}
                                                setNewSearchQuery={this.props.setNewSearchQuery}
                                            />
                                        }
                                    </div>
                                    <div className="col-definition">
                                        {current_id &&
                                            <ConceptInformation
                                                current_id={current_id}
                                                setNewSearchQuery={this.props.setNewSearchQuery}
                                            />
                                        }
                                    </div>
                                </div>
                            )
                        }}
                    </GetMatchingResults>
                </div>
            </div>
        );
    }
}

SnomedCtConceptAutocomplete.defaultProps = {
};
SnomedCtConceptAutocomplete.propTypes = {
    query: PropTypes.string,
    currentIndex: PropTypes.number,
    setNewIndex: PropTypes.func.isRequired,
    setNewSearchQuery: PropTypes.func.isRequired,
    setShadowId: PropTypes.func.isRequired,
};
export default SnomedCtConceptAutocomplete;