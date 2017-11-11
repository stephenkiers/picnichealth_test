import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

class HeirarchyList extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            current_id: undefined,
        };
    }
    componentWillReceiveProps(nextProps) {

    }
    render () {
        const {current_id} = this.props;
        if (!current_id) {
            return <div />
        }
        return (
            <div>
                current: {current_id}
            </div>
        );
    }
}

HeirarchyList.defaultProps = {
};
HeirarchyList.propTypes = {
    current_id: PropTypes.number,

};

export default HeirarchyList;