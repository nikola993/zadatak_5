import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import userActions from '../../actions/user.actions';

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
    }

    handleDeleteUser() {
        const { user } = this.props;
        const { actions } = this.props;
        if (user.user[0].username) {
            actions.destroy(user.user[0].username);
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { user } = this.props;
        const { password } = this.state;
        const { actions } = this.props;
        if (password) {
            actions.passwordChange(password, user.user[0].username);
        }
    }

    render() {
        const { user } = this.props;
        const { password, submitted } = this.state;
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li role="presentation"><Link href="/" to="/">Home</Link></li>
                    <li role="presentation" className="active"><Link href="/Account" to="/Account">Account</Link></li>
                    <li role="presentation"><Link href="/memorygame" to="/memorygame">Memory Game</Link></li>
                    <li role="presentation"><Link href="/login" to="/login">Logout</Link></li>
                </ul>
                <div className="container" style={{ marginTop: `${30}px`, marginBottom: `${30}px` }}>
                    <div className="row">
                        <p className="col-xs-2"><strong>First name:</strong></p>
                        <p id="firstname" className="center-block">
                            { user.user[0].firstName }
                            {' '}
                        </p>
                    </div>
                    <div className="row">
                        <p className="col-xs-2"><strong>Last name:</strong></p>
                        <p id="lastname" className="center-block">
                            { user.user[0].lastName }
                            {' '}
                        </p>
                    </div>
                    <div className="row">
                        <p className="col-xs-2"><strong>Username:</strong></p>
                        <p id="username" className="center-block">
                            { user.user[0].username }
                            {' '}
                        </p>
                    </div>
                </div>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
                        <p htmlFor="password">New Password</p>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} autoComplete="off" />
                        {submitted && !password
                        && <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Change password</button>
                    </div>
                </form>
                <div className="text-right">
                    <button type="button" className="btn btn-danger" onClick={this.handleDeleteUser}>Delete accaunt</button>
                </div>
            </div>
        );
    }
}
AccountPage.propTypes = {
    actions: PropTypes.shape({}).isRequired,
    user: PropTypes.shape({}).isRequired,
};

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(userActions, dispatch),
    };
}

const connectedAccountPage = connect(mapStateToProps, mapDispatchToProps)(AccountPage);
export default connectedAccountPage;
