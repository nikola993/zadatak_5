import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import userActions from '../../actions/user.actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        const { actions } = this.props;
        // reset login status
        actions.logout();

        this.state = {
            username: '',
            password: '',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { actions } = this.props;
        if (username && password) {
            actions.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={`form-group${submitted && !username ? ' has-error' : ''}`}>
                        <p><strong>Username</strong></p>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username
                            && <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
                        <p><strong>Password</strong></p>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} autoComplete="off" />
                        {submitted && !password
                            && <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Login</button>
                        { loggingIn }
                        <Link href="/register" to="/register" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}

LoginPage.propTypes = {
    loggingIn: PropTypes.bool,
    actions: PropTypes.shape({}).isRequired,
};

LoginPage.defaultProps = {
    loggingIn: undefined,
};

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch),
    };
}

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default connectedLoginPage;
