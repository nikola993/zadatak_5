import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import GameActions from '../../actions/game.actions';

import GameElement from './element';
import Timer from './timer';
import './styles.css';

class MemoryGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // create new board with shuffled values
            boardElementsValue: this.shuffledElements(),
            guessedElements: [],
        };
        this.selectedElement = this.selectedElement.bind(this);
    }

    componentDidUpdate() {
        const { gameState } = this.props;
        const { gameActions } = this.props;
        const { guessedElements } = this.state;
        const elements = gameState.get('selectElements');

        if (elements.size === 2) {
            const firstElement = elements.get(0);
            const secondElement = elements.get(1);
            if (firstElement.value === secondElement.value) {
                guessedElements.push(firstElement.activeIndex);
                guessedElements.push(secondElement.activeIndex);
                gameActions.elementsCompared();
                if (guessedElements.length === 16) {
                    gameActions.timerStop();
                }
            } else {
                gameActions.disableElement();
                setTimeout(() => {
                    gameActions.elementsCompared();
                    gameActions.enableElement();
                }, 1000);
            }
        }
    }

    componentWillUnmount() {
        const { gameActions } = this.props;
        gameActions.timerStop();
        gameActions.elementsCompared();
    }

    selectedElement(index) {
        const { gameState } = this.props;
        const elements = gameState.get('selectElements');
        if (elements.size === 2) {
            const firstElement = elements.get(0);
            const secondElement = elements.get(1);
            if (firstElement.activeIndex === index || secondElement.activeIndex === index) {
                return true;
            }
        } else if (elements.size === 1) {
            const firstElement = elements.first();
            if (firstElement.activeIndex === index) {
                return true;
            }
        }
        return false;
    }

    handleClick(index, value) {
        const { gameActions } = this.props;
        gameActions.timerStart();
        gameActions.selectField(index, value);
    }

    // get array of elements and shuffle them for board state
    shuffledElements() {
        const gameElements = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
        let currentIndex = gameElements.length;
        let temporaryValue;
        let randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = gameElements[currentIndex];
            gameElements[currentIndex] = gameElements[randomIndex];
            gameElements[randomIndex] = temporaryValue;
        }
        return gameElements;
    }

    render() {
        const { boardElementsValue } = this.state;
        const { guessedElements } = this.state;
        const { gameState } = this.props;
        const elementDisable = gameState.get('elementDisable');
        const timerState = gameState.get('timerState');
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li role="presentation"><Link href="/" to="/">Home</Link></li>
                    <li role="presentation"><Link href="/account" to="/account">Account</Link></li>
                    <li role="presentation" className="active"><Link href="/memorygame" to="/memorygame">Memory Game</Link></li>
                    <li role="presentation"><Link href="/login" to="/login">Logout</Link></li>
                </ul>
                <div id="gameBoard">
                    <div>
                        { boardElementsValue.map((element, index) => (
                            <GameElement
                                key={index.toString()}
                                index={index}
                                value={element}
                                onClick={() => this.handleClick(index, element)}
                                isActive={this.selectedElement(index)}
                                elementGuessed={guessedElements}
                                elementDisable={elementDisable}
                            />
                        ))
                        }
                    </div>
                </div>
                <div className="center">
                    <div><strong>Time: </strong></div>
                    <Timer
                        timerState={timerState}
                    />
                </div>
            </div>
        );
    }
}

MemoryGame.propTypes = {
    gameState: PropTypes.shape({}).isRequired,
    gameActions: PropTypes.shape({}).isRequired,
};

function mapStateToProps(state) {
    const { game: gameState } = state;
    return {
        gameState,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        gameActions: bindActionCreators(GameActions, dispatch),
    };
}

const game = connect(mapStateToProps, mapDispatchToProps)(MemoryGame);
export default game;
