import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import AutocompleteResultsList from "./components/AutocompleteResultsList";
import GetMatchingResults from "../getters/GetMatchingResults";
import HeirarchyList from "./components/HeirarchyList";

const getCurrentNode = (results, i) => {
    if (!results || results.get('totalCount') === 0) {
        return undefined;
    }
    if (i > results.get('totalCount')) {
        i = results.get('totalCount');
    }
    return results.get('results')._list.get(i)[1]
};

class SnomedCtConceptAutocomplete extends Component {
    constructor() {
        super();
    }
    render () {
        return (
            <GetMatchingResults query={this.props.query}>
                {autocompleteResults => {
                    const current = getCurrentNode(autocompleteResults, this.props.currentIndex);
                    return (
                        <div className="snomed-autocomplete-dropdown">
                            <div className="internal-container">
                                <div className="d-flex">
                                    <div className="col-autocomplete">
                                        <AutocompleteResultsList
                                            query={this.props.query}
                                            currentIndex={this.props.currentIndex}
                                            autocompleteResults={autocompleteResults}
                                        />
                                    </div>
                                    <div className="col-heirarchy">
                                        <HeirarchyList
                                            current_id={current && current.get('id')}
                                        />
                                    </div>
                                    <div className="col-definition">
                                        about?
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </GetMatchingResults>
        );
    }
}

SnomedCtConceptAutocomplete.defaultProps = {
};
SnomedCtConceptAutocomplete.propTypes = {
    query: PropTypes.string,
    currentIndex: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(SnomedCtConceptAutocomplete);