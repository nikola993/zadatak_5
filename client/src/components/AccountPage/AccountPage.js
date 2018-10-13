import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActions } from '../../actions';

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDeleteUser(user) {
        const { actions } = this.props;
        return (e) => actions.delete(user);
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
                    <li role="presentation"><Link to="/">Home</Link></li>
                    <li role="presentation" className="active"><Link to="/Account">Account</Link></li>
                    <li role="presentation"><Link to="/memorygame">Memory Game</Link></li>
                    <li role="presentation"><Link to="/login">Logout</Link></li>
                </ul>
                <div className="container" style={{marginTop: 30 + 'px', marginBottom: 30 + 'px'}}>
                    <div className="row">
                        <label htmlFor="firstname" className="col-xs-2">First name:</label>
                        <p id="firstname"className="center-block">{ user.user[0].firstName } </p>
                    </div>
                    <div className="row">
                        <label htmlFor="lastname" className="col-xs-2">Last name:</label>
                        <p id="lastname"className="center-block">{ user.user[0].lastName } </p>
                    </div>
                    <div className="row">
                        <label htmlFor="username" className="col-xs-2">Username:</label>
                        <p id="username"className="center-block">{ user.user[0].username } </p>
                    </div>
                </div>
                <form name="form" onSubmit={this.handleSubmit}>
                <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                    <label htmlFor="password">New Password</label>
                    <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} autoComplete="off"/>
                    {submitted && !password &&
                        <div className="help-block">Password is required</div>
                    }
                </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Change password</button>
                    </div>
                </form>
                <div className="text-right">
                    <a onClick={this.handleDeleteUser(user.user[0].username)}>Delete accaunt</a>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
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
export { connectedAccountPage as AccountPage };