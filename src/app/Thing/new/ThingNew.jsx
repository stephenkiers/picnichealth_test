import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ThingNew extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };
        this.onChange = e => {
            const name = e.target.value;
            this.setState(() => ({name}))
        };
        this.onSubmit = e => {
            e.preventDefault();
            this.props.onSubmit(this.state.name);
            this.setState(() => ({name: ""}));
        };
    }
    render () {
        return (
            <form
                onSubmit={this.onSubmit}
            >
                <div className="thing-new">
                    <div className="row">
                        <div className="form-group col-8">
                            <input
                                type="text"
                                className="form-control"
                                id="AddName"
                                placeholder="Add Name"
                                onChange={this.onChange}
                                value={this.state.name}
                            />
                        </div>
                        <div className="col-4">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

ThingNew.defaultProps = {
};
ThingNew.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ThingNew