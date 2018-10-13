import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import userActions from '../../actions/user.actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
            },
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value,
            },
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { actions } = this.props;
        if (user.firstName && user.lastName && user.username && user.password) {
            actions.register(user);
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={`form-group${submitted && !user.firstName ? ' has-error' : ''}`}>
                        <p>First Name</p>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName
                            && <div className="help-block">First Name is required</div>
                        }
                    </div>
                    <div className={`form-group${submitted && !user.lastName ? ' has-error' : ''}`}>
                        <p>Last Name</p>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        {submitted && !user.lastName
                            && <div className="help-block">Last Name is required</div>
                        }
                    </div>
                    <div className={`form-group${submitted && !user.username ? ' has-error' : ''}`}>
                        <p>Username</p>
                        <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username
                            && <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={`form-group${submitted && !user.password ? ' has-error' : ''}`}>
                        <p>Password</p>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} autoComplete="off" />
                        {submitted && !user.password
                            && <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Register</button>
                        { registering }
                        <Link href="/login" to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

RegisterPage.propTypes = {
    actions: PropTypes.shape({}).isRequired,
    user: PropTypes.shape({}),
    registering: PropTypes.bool,
};

RegisterPage.defaultProps = {
    user: undefined,
    registering: undefined,
};

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch),
    };
}

const connectedRegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
export default connectedRegisterPage;
