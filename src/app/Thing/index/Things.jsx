import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import ThingContainer from "../show/ThingContainer";

class Things extends Component {

    render() {
        const {thing_ids} = this.props;
        return (
            <div className="index-of-records">
                {thing_ids
                    /*
                    .sortBy(record => record.get('created_at'))
                    .reverse()
                    */
                    .map(thing_id => {
                        return (
                            <ThingContainer
                                key={thing_id}
                                thing_id={thing_id}
                            />
                        )
                    }).toJS()}
            </div>
        )
    }
}
Things.defaultProps = {
};
Things.propTypes = {
    thing_ids: ImmutablePropTypes.set.isRequired,
}

export default Things
