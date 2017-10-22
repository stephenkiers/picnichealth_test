import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import {apiGetStatsUpdate, apiRecordDelete} from "../actions";
import Stats from "./Stats";
import {getStats} from "../../reducers";


class StatsContainer extends Component {
    constructor(props) {
        super(props);
        props.apiGetStatsUpdate();

    }
    componentDidMount() {
        this.interval = setInterval(() => {
            this.props.apiGetStatsUpdate()
        }, 7500);
    }
    componentWillUnmount() {
        if (this.interval) {
            this.interval = clearInterval(this.interval);
        }
    }
    render() {
        return (
            <Stats
                total_records={this.props.stats.get('total_records')}
                avg_per_hour={this.props.stats.get('avg_per_hour')}
                records_last_hour_ratio={this.props.stats.get('records_last_hour_ratio')}
            />
        )
    }
}
StatsContainer.defaultProps = {
};
StatsContainer.propTypes = {
}

const mapStateToProps = (state, ownProps) => ({
    stats: getStats(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    apiGetStatsUpdate(id) {
        dispatch(apiGetStatsUpdate())
    }
});



export default connect(mapStateToProps, mapDispatchToProps)(StatsContainer)
