import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

class HierarchyNode extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    componentWillReceiveProps(nextProps) {
    }

    render () {
        return (
            <div className={`hierarchy-node ${this.props.className}`}>
                <div className="hierarchy-node-primary">
                    <span className="hierarchy-node-name">
                        {this.props.name}
                    </span>
                </div>
                <div className="hierarchy-node-secondary">
                    <span className="hierarchy-node-id">
                        {this.props.id}
                    </span>{' '}
                    <span className="hierarchy-node-children-count">
                        ({this.props.childrenCount} children)
                    </span>
                </div>
            </div>
        );
    }
}

HierarchyNode.defaultProps = {
    className: "",
};
HierarchyNode.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number,
    childrenCount: PropTypes.number,
    className: PropTypes.string,
};

export default HierarchyNode;