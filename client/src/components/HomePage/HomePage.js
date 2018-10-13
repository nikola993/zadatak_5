import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import userActions from '../../actions/user.actions';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        const { user } = this.props;
        this.state = {
            user,
        };
    }

    render() {
        const { user } = this.state;
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li role="presentation" className="active"><Link href="/" to="/">Home</Link></li>
                    <li role="presentation"><Link href="/account" to="/account">Account</Link></li>
                    <li role="presentation"><Link href="/memorygame" to="/memorygame">Memory Game</Link></li>
                    <li role="presentation"><Link href="/login" to="/login">Logout</Link></li>
                </ul>
                <h1>
                    {'Hi '}
                    {user.user[0].username}
                    {'!'}
                </h1>
            </div>
        );
    }
}

HomePage.propTypes = {
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

const connectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage);
export default connectedHomePage;
