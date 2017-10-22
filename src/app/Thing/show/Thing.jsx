import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

class Thing extends Component {
    render() {
        const {thing} = this.props;
        return (
            <div className="record clearfix">
                {thing.get('name')}
            </div>
        )
    }
};
Thing.defaultProps = {
};
Thing.propTypes = {
    thing: ImmutablePropTypes.map.isRequired,
}

export default Thing;
