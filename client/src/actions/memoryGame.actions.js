import types from '../constants/memoryGame.constants';

export function selectField(elementSelected) {
    return {
        type: types.SELECT_FIELD,
        elementSelected,
    };
}

export function isEqual() {
    return {
        type: types.IS_EQUAL,
    };
}

export function notEqual() {
    return {
        type: types.NOT_EQUAL,
    };
}
