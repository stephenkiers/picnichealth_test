import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import RecordContainer from "../show/RecordContainer";


class Records extends Component {

    render() {
        return (
            <div className="index-of-records">
                {
                    this.props.records
                        .sortBy(record => record.get('created_at'))
                        .reverse()
                        .map(record => {
                            return (
                                <RecordContainer
                                    key={record.get('id')}
                                    record={record}
                                />
                            )
                        }).toJS()
                }
            </div>
        )
    }
}
Records.defaultProps = {
};
Records.propTypes = {
    records: ImmutablePropTypes.set.isRequired,
}

export default Records
