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

    render () {c
        return (
            <GetMatchingResults query={this.props.query}>
                {autocompleteResults => (
                    <span>
                        auto-complete<br />
                        {autocompleteResults && JSON.stringify(autocompleteResults.toJS())}
                    </span>
                )}
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