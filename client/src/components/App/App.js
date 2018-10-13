import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { history } from '../../helpers';
import { alertActions } from '../../actions';
import { PrivateRoute } from '../PrivateRoute';
import { HomePage } from '../HomePage/HomePage';
import { AccountPage } from '../AccountPage/AccountPage';
import { MemoryGame } from '../MemoryGamePage/MemoryGamePage';
import { LoginPage } from '../LoginPage/LoginPage';
import { RegisterPage } from '../RegisterPage/RegisterPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { actions } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            actions.clear();
        });
    }
    
    render() {
        const { alert } = this.props;
        return (
            <div>
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/account" component={AccountPage} />
                                <PrivateRoute exact path="/memorygame" component={MemoryGame} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(alertActions, dispatch),
    };
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export { connectedApp as App }; 