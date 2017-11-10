import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import GetMatchingResults from "./getters/GetMatchingResults";

class SnomedCtConceptAutocomplete extends Component {
    constructor() {
        super();
    }
    render () {
        return (
            <div className="snomed-autocomplete-dropdown">
                <div className="internal-container">
                    <div className="row">
                        <div className="col-4">
                            <GetMatchingResults query={this.props.query}>
                                {autocompleteResults => (
                                    <span>
                                        auto-complete<br />
                                        {autocompleteResults && JSON.parse(autocompleteResults)}
                                    </span>
                                )}
                            </GetMatchingResults>
                        </div>
                        <div className="col-4">
                            heirarchy
                        </div>
                        <div className="col-4">
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