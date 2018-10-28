import { List, Map } from 'immutable';
import gameTypes from '../constants/game.constants';

const inittialSate = Map({
    elementDisable: false,
    selectElements: List(),
    timerState: false,
});

export default function elementDisable(state = inittialSate, action) {
    switch (action.type) {
    case gameTypes.DISABLE_ELEMENT: {
        const newState = state.set('elementDisable', true);
        return newState;
    }
    case gameTypes.ENABLE_ELEMENT: {
        const newState = state.set('elementDisable', false);
        return newState;
    }
    case gameTypes.SELECT_FIELD: {
        const selectedElement = {
            activeIndex: action.index,
            value: action.value,
        };
        const newState = state.update('selectElements',
            list => (list.push(selectedElement)));
        return newState;
    }
    case gameTypes.ELEMENTS_COMPARED: {
        const newState = state.update('selectElements',
            list => (list.clear()));
        return newState;
    }
    case gameTypes.START: {
        const newState = state.set('timerState', true);
        return newState;
    }
    case gameTypes.STOP: {
        const newState = state.set('timerState', false);
        return newState;
    }
    default:
        return state;
    }
}
