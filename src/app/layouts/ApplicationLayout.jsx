import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

class ApplicationLayout extends PureComponent {
    render () {
        return (
            <div>
                <header>
                    <div className="d-flex align-items-center">
                        <img src="https://placehold.it/25x25" />
                        <h1>
                            React Test Application
                        </h1>
                    </div>
                </header>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
ApplicationLayout.defaultProps = {
};
ApplicationLayout.propTypes = {
};

export default ApplicationLayout