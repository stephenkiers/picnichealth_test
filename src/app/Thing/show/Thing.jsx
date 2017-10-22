import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

class Thing extends Component {
    render() {
        const {thing} = this.props;
        return (
            <div className="thing">
                <div className="row align-items-center">
                    <div className="col-11">
                        {thing.get('name')}
                    </div>
                    <div className="col-1">
                        <button
                            className="btn btn-danger btn-block"
                            onClick={this.props.handleDelete}
                        >
                            &times;
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
Thing.defaultProps = {
};
Thing.propTypes = {
    thing: ImmutablePropTypes.map.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default Thing;
