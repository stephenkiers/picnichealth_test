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
    componentWillReceiveProps(nextProps) {
        if (
            nextProps.autocompleteResults
            && (nextProps.currentIndex !== this.props.currentIndex || !nextProps.autocompleteResults.equals(this.props.autocompleteResults))
            && nextProps.autocompleteResults.get('results').size > 0
        ) {
            this.props.setShadowId(nextProps.autocompleteResults.get('results')._list.get(nextProps.currentIndex)[0]);
        }
    }
    render () {
        const {autocompleteResults} = this.props;
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
    setShadowId: PropTypes.func.isRequired,
};

export default AutocompleteResultsList;