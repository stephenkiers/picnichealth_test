import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetMatchingResults from "../getters/GetMatchingResults";

class AutocompleteResultsList extends Component {
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
            <GetMatchingResults query={this.props.query}>
                {autocompleteResults => {
                    if (!autocompleteResults) {
                        return <div>Searching...</div>;
                    }
                    if (autocompleteResults.get('totalCount') === 0 ) {
                        return <div>No results found.</div>;
                    }
                    return (
                        <div className="autocomplete-container">
                            {autocompleteResults.get("results").map(result => {
                                return (
                                    <div
                                        key={result.get('id')}
                                        className="autocomplete-item"
                                    >
                                        {result.get('label')}<br />
                                        {result.get('score')}
                                    </div>
                                )
                            }).valueSeq().toArray()}
                        </div>
                    )
                }}
            </GetMatchingResults>
        );
    }
}

AutocompleteResultsList.defaultProps = {
};
AutocompleteResultsList.propTypes = {
    query: PropTypes.string,
};

export default AutocompleteResultsList;