import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import {getConcept} from "../../../reducers";
import {snomedCtGetDefinition} from "../../server_actions";

class GetConcept extends Component {
    componentDidMount() {
        this.getConceptFromServer(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.getConceptFromServer(nextProps);
    }
    getConceptFromServer(props) {
        if (!props.concept) {
            this.props.snomedCtGetDefinition(props.id);
        }
    }
    render () {
        return this.props.children(this.props.concept);
    }
}
GetConcept.defaultProps = {
};
GetConcept.propTypes = {
    id: PropTypes.number.isRequired,
};
const mapStateToProps = (state, ownProps) => ({
    concept: getConcept(state, ownProps.id),
});
const mapDispatchToProps = (dispatch, ownProps) => ({
    snomedCtGetDefinition(id) {
        dispatch(snomedCtGetDefinition(id));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(GetConcept);