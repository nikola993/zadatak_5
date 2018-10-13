import { userConstants } from '../constants';
import { userService } from '../services/user.service';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register,
    delete: _delete,
    passwordChange
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(user) {
    return dispatch => {
        dispatch(request(user));

        userService.delete(user)
            .then(
                user => {
                    dispatch(success(user)),
                    history.push('/login');
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(user) { return { type: userConstants.DELETE_REQUEST, user } }
    function success(user) { return { type: userConstants.DELETE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.DELETE_FAILURE, error } }
}

function passwordChange(password, username) {
    return dispatch => {
        dispatch(request(password, username));

        userService.passwordChange(password, username)
            .then(
                username => {
                    dispatch(success(username)),
                    dispatch(alertActions.success('Password change successful'));
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(username) { return { type: userConstants.UPDATE_REQUEST, username } }
    function success(username) { return { type: userConstants.UPDATE_SUCCESS, username } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}