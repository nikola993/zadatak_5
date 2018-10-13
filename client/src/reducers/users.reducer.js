import userConstants from '../constants/user.constants';

export default function users(state = {}, action) {
    switch (action.type) {
    case userConstants.UPDATE_REQUEST:
        return {
            loading: true,
        };
    case userConstants.UPDATE_SUCCESS:
        return {
            items: action.users,
        };
    case userConstants.UPDATE_FAILURE:
        return {
            error: action.error,
        };
    case userConstants.DELETE_REQUEST:
        // add 'deleting:true' property to user being deleted
        return {
            items: action,
        };
    case userConstants.DELETE_SUCCESS:
        // remove deleted user from state
        return {
            items: action.user,
        };
    case userConstants.DELETE_FAILURE:
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user
        return {
            items: action.user,
        };
    default:
        return state;
    }
}
