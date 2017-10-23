import React, {Component} from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

class Thing extends Component {
    render() {
        const {thing} = this.props;
        return (
            <div className="thing">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        {thing.get('name')}
                    </div>
                    <div>
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
