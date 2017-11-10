import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import GetMatchingResults from "./getters/GetMatchingResults";
import AutocompleteResultsList from "./components/AutocompleteResultsList";

class SnomedCtConceptAutocomplete extends Component {
    constructor() {
        super();
    }
    render () {
        return (
            <div className="snomed-autocomplete-dropdown">
                <div className="internal-container">
                    <div className="d-flex">
                        <div className="col-autocomplete">
                            <AutocompleteResultsList
                                query={this.props.query}
                            />
                        </div>
                        <div className="col-heirarchy">
                            heirarchy
                        </div>
                        <div className="col-definition">
                            about?
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SnomedCtConceptAutocomplete.defaultProps = {
};
SnomedCtConceptAutocomplete.propTypes = {
    query: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(SnomedCtConceptAutocomplete);