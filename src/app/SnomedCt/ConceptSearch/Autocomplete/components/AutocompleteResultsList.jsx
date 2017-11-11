import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetMatchingResults from "../../getters/GetMatchingResults";

class AutocompleteResultsList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }
    render () {
        const {autocompleteResults} = this.props;
        if (!autocompleteResults) {
            return <div>Searching...</div>;
        }
        if (autocompleteResults.get('totalCount') === 0) {
            return <div>No results found.</div>;
        }

        let i = -1; // Map doesn't have an index, so we are providing one
        return (
            <div className="autocomplete-container">
                {autocompleteResults.get("results").map(result => {
                    i++;
                    return (
                        <div
                            key={result.get('id')}
                            className={`autocomplete-item${this.props.currentIndex === i ? ' current' : ''}`}
                        >
                            <div className="label">
                                {result.get('label')}
                            </div>
                            <div className="score">
                                {result.get('id')} : {result.get('score')}
                            </div>
                        </div>
                    )
                }).valueSeq().toArray()}
            </div>
        )
    }
}

AutocompleteResultsList.defaultProps = {
};
AutocompleteResultsList.propTypes = {
    autocompleteResults: ImmutablePropTypes.map,
    currentIndex: PropTypes.number.isRequired,
};

export default AutocompleteResultsList;