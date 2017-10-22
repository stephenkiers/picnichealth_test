import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'


class Stats extends Component {

    render() {
        const {total_records, avg_per_hour, records_last_hour_ratio} = this.props;
        return (
            <div>
                <div className="pill" title="Total">
                    <strong>Total</strong>
                    <span>{total_records}</span>
                </div>
                <div className="pill" title="Avg /hour">
                    <strong>Avg /hour</strong>
                    <span>{avg_per_hour}</span>
                </div>
                <div className={`pill ${records_last_hour_ratio > 0 ? 'positive': 'negative'}`} title="Last hour">
                    <strong>Last hour</strong>
                    <span>{records_last_hour_ratio > 0 ? `+${records_last_hour_ratio}` : records_last_hour_ratio}</span>
                </div>
            </div>
        )
    }
}
Stats.defaultProps = {
};
Stats.propTypes = {
    total_records: PropTypes.number,
    avg_per_hour: PropTypes.number,
    records_last_hour_ratio: PropTypes.number,
}

export default Stats
