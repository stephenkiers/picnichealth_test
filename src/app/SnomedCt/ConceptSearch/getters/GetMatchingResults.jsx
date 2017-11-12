import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import {getSearchResultIds} from "../../../reducers";
import {snomedCtAutocompleteSearch} from "../../server_actions";

class GetMatchingResults extends Component {
    constructor() {
        super();
        this.triggerLookup = (query) => {
            this.props.snomedCtAutocompleteSearch(query);
        };
        this.triggerLookupDebounced = debounce(this.triggerLookup, 300, {
            trailing: true,
            maxWait: 1500,
        });
    }
    componentDidMount() {
        this.triggerLookupDebounced(this.props.query);
    }
    componentWillReceiveProps(nextProps) {
        if (
            !nextProps.autocompleteResults
            && nextProps.query
            && nextProps.query !== this.props.query
        ) {
            this.triggerLookupDebounced(nextProps.query);
        }
    }
    render () {
        return this.props.children(this.props.autocompleteResults);
    }
}
GetMatchingResults.defaultProps = {
};
GetMatchingResults.propTypes = {
    query: PropTypes.string.isRequired,
};
const mapStateToProps = (state, ownProps) => ({
    autocompleteResults: getSearchResultIds(state, ownProps.query),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    snomedCtAutocompleteSearch(query) {
        dispatch(snomedCtAutocompleteSearch(query))
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(GetMatchingResults);