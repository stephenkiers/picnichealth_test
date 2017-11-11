import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import GetConcept from "../../getters/GetConcept";

class ConceptInformation extends Component {
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
            <GetConcept
                id={this.props.current_id}
            >
                {concept => (
                    <div>
                        concept:
                        {JSON.stringify(concept)}
                    </div>
                )}
            </GetConcept>
        );
    }
}

ConceptInformation.defaultProps = {
};
ConceptInformation.propTypes = {
    current_id: PropTypes.number,
};

export default ConceptInformation;