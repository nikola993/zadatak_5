import gameTypes from '../constants/game.constants';

function enableElement() {
    return {
        type: gameTypes.ENABLE_ELEMENT,
    };
}

function disableElement() {
    return {
        type: gameTypes.DISABLE_ELEMENT,
    };
}

function selectField(index, value) {
    return {
        type: gameTypes.SELECT_FIELD,
        index,
        value,
    };
}

function elementsCompared() {
    return {
        type: gameTypes.ELEMENTS_COMPARED,
    };
}

function timerStart() {
    return {
        type: gameTypes.START,
    };
}

function timerStop() {
    return {
        type: gameTypes.STOP,
    };
}
const gameAction = {
    enableElement,
    disableElement,
    selectField,
    elementsCompared,
    timerStart,
    timerStop,
};

export default gameAction;
