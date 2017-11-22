import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'

class ApplicationLayout extends PureComponent {
    render () {
        return (
            <div>
                <header>
                    <div className="container">
                        <div className="d-flex align-items-center">
                            <div>
                                <img
                                    src="https://placehold.it/25x25"
                                    className="header-logo mr-3"
                                />
                            </div>
                            <h1 className="header-h1">
                                Coinbase Takehome Test App
                            </h1>
                        </div>
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