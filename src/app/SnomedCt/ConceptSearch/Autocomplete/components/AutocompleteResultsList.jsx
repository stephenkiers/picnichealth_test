import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetMatchingResults from "../../getters/GetMatchingResults";

class AutocompleteResultsListItem extends Component {
    constructor() {
        super();
        this.onClick = e => {
            e.preventDefault();
            this.props.setNewIndex(this.props.index)
        };
    }
    render () {
        const {result} = this.props;
        return(
            <div
                key={result.get('id')}
                className={`autocomplete-item${this.props.current ? ' current' : ''}`}
                onClick={this.onClick}
            >
                <div className="label">
                    {result.get('name')}
                </div>
                <div className="item-id">
                    {result.get('id')}
                </div>
            </div>
        )
    }
}
class AutocompleteResultsList extends Component {
    constructor() {
        super();
        this.onClick = e => {
            e.preventDefault();
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
                        <AutocompleteResultsListItem
                            key={result.get('id')}
                            result={result}
                            index={i}
                            setNewIndex={this.props.setNewIndex}
                            current={this.props.currentIndex === i}
                        />
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
    setNewIndex: PropTypes.func.isRequired,
};

export default AutocompleteResultsList;