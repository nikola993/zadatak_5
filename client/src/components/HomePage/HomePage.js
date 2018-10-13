import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userActions } from '../../actions';

class HomePage extends React.Component {
    handleDeleteUser(user) {
        const { actions } = this.props;
        return (e) => actions.delete(user);
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li role="presentation" className="active"><Link to="/">Home</Link></li>
                    <li role="presentation"><Link to="/account">Account</Link></li>
                    <li role="presentation"><Link to="/memorygame">Memory Game</Link></li>
                    <li role="presentation"><Link to="/login">Logout</Link></li>
                </ul>
                <h1>Hi {user.user[0].username}!</h1>
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

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export { connectedHomePage as HomePage };