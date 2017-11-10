import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

class SnomedCtConceptAutocomplete extends Component {
    constructor() {
        super();
        this.triggerLookup = () => {
            console.log("search for", this.props.query);
        };
        this.triggerLookupDebounced = debounce(this.triggerLookup, 300, {
            leading: true,
            trailing: true,
            maxWait: 1500,
        });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.query && nextProps.query !== this.props.query) {
            this.triggerLookupDebounced();
        }
    }
    render () {
        return (
            <div className="snomed-autocomplete-dropdown">
                <div className="internal-container">
                    <div className="row">
                        <div className="col-4">
                            autocomplete
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