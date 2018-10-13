import { List } from 'immutable';
import types from '../constants/memoryGame.constants';

export default function memoryGame(state = List(), action) {
    switch (action.type) {
    case types.SELECT_FIELD: {
        return state.push(action.elementSelected);
    }
    case types.IS_EQUAL: {
        const newState = List();
        return newState;
    }
    case types.NOT_EQUAL: {
        const newState = List();
        return newState;
    }
    default:
        return state;
    }
}
