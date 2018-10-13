import userConstants from '../constants/user.constants';
import userService from '../services/user.service';
import alertActions from './alert.actions';
import history from '../helpers/history';


function login(username, password) {
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user }; }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error }; }

    return (dispatch) => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                (user) => {
                    dispatch(success(user));
                    history.push('/');
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    function request(users) { return { type: userConstants.REGISTER_REQUEST, users }; }
    function success(users) { return { type: userConstants.REGISTER_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error }; }

    return (dispatch) => {
        dispatch(request(user));

        userService.register(user)
            .then(
                (users) => {
                    dispatch(success(users));
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                (error) => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

// prefixed function name with underscore because delete is a reserved word in javascript
function destroy(user) {
    function request(users) { return { type: userConstants.DELETE_REQUEST, users }; }
    function success(users) { return { type: userConstants.DELETE_SUCCESS, users }; }
    function failure(error) { return { type: userConstants.DELETE_FAILURE, error }; }

    return (dispatch) => {
        dispatch(request(user));
        userService.destroy(user)
            .then(
                (users) => {
                    dispatch(success(users));
                    history.push('/login');
                },
                error => dispatch(failure(error.toString()))
            );
    };
}

function passwordChange(password, username) {
    function request(user) { return { type: userConstants.UPDATE_REQUEST, user }; }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user }; }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error }; }

    return (dispatch) => {
        dispatch(request(password, username));

        userService.passwordChange(password, username)
            .then(
                (user) => {
                    dispatch(success(user));
                    dispatch(alertActions.success('Password change successful'));
                },
                error => dispatch(failure(error.toString()))
            );
    };
}

const userActions = {
    login,
    logout,
    register,
    destroy,
    passwordChange,
};

export default userActions;
