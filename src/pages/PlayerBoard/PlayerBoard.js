import { useEffect, useState } from 'react';
import Board from  '../../components/board';
import Card from '../../components/card';
import GameOver from '../../components/game-over';
import { v4 as uuidv4 } from 'uuid';
import { shuffle } from '../../utils';
import restartButton from './restart.png';
import './style.scss';
import resources from '../../assets/resources.json';

const { playableCards, coverCard } = resources;

const PlayerBoard = ({ players, setPlayers }) => {
    const [currentPlayerId, setCurrentPlayerId] = useState(1);
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [currentFlippedCards, setCurrentFlippedCards] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [showWinner, setShowWinner] = useState(false);

    useEffect(() => {
        randomizeCards();
    }, []);

    useEffect(() => {
        checkOnFlip();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFlippedCards]);

    useEffect(() => {
        checkIfGameIsFinished();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flippedCards]);

    const checkOnFlip = () => {
        let flipTimer;

        if (currentFlippedCards.length === 2) {
            const cardsToCompare = cards.filter(item => currentFlippedCards.includes(item.uuid));

            if (cardsToCompare[0].id === cardsToCompare[1].id) {
                increasePlayerScore(currentPlayerId);
                setFlippedCards(prev => [...prev, cardsToCompare[0].id]);
                setCurrentFlippedCards([]);
            } else { 
                flipTimer = setTimeout(() => {
                    setCurrentFlippedCards([]);
                    switchToNextPlayer();
                }, 2000);
            }
        }

        return () => {
            clearTimeout(flipTimer);
        }
    };

    const checkIfGameIsFinished = () => {
        let gameOverTimer;

        if (flippedCards.length > 0 && flippedCards.length === cards.length/2) {
            gameOverTimer = setTimeout(() => {
                setIsGameOver(true);
                setShowWinner(true);
            }, 2000);
        }

        return () => {
            clearTimeout(gameOverTimer);
        }
    }

    const randomizeCards = () => {
        setCards(shuffle([...playableCards, ...playableCards]).map(cardItem => ({
            ...cardItem,
            uuid: uuidv4()
        })));
    };

    const switchToNextPlayer = () => {
        if (currentPlayerId === players.length) {
            setCurrentPlayerId(players[0].id);
        } else {
            setCurrentPlayerId(prev => prev + 1);
        }
    };

    const increasePlayerScore = (playerId) => {
        setPlayers(prev => {
            const newPlayers = prev.map(player => {
                if (player.id === playerId) {
                    player.score = player.score + 1;
                }

                return player;
            });

            return newPlayers;
        });
    };

    const onFlipCard = (selectedCardUniqueId, selectedCardId) => {
        const cardCanBePicked = !currentFlippedCards.includes(selectedCardUniqueId) && currentFlippedCards.length < 2 && !flippedCards.includes(selectedCardId);
        
        if (cardCanBePicked) {
            setCurrentFlippedCards((prev) => [...prev, selectedCardUniqueId]);
        }
    };

    const onRestartGame = () => {
        randomizeCards();
        setPlayers(prev => {
            const resetPlayers = prev.map(player => ({
                ...player,
                score: 0
            }));

            return resetPlayers;
        });
        setIsGameOver(false);
        setFlippedCards([]);
        setCurrentFlippedCards([]);
        setCurrentPlayerId(players[0].id);
        setShowWinner(false);
    };

    const winner = isGameOver ? players.reduce((max, player) => max.score > player.score ? max : player ) : null;

    return (
        <div>
            {(isGameOver && showWinner) && 
                <GameOver
                    winnerName={winner.name} 
                    onClick={() => {
                        setShowWinner(false);
                    }}
                />
            }
            <Board 
                currentPlayerName={players.find(player => player.id === currentPlayerId).name}
                players={players}
            >
                <div className='player-board-card-list'>
                    {cards.map((cardItem) =>
                        <Card 
                            key={cardItem.uuid}
                            card={cardItem}
                            cardCover={coverCard}
                            isSelected={flippedCards.includes(cardItem.id) || currentFlippedCards.includes(cardItem.uuid)}
                            onClick={() => onFlipCard(cardItem.uuid, cardItem.id)}
                        />
                    )}
                </div>
                {isGameOver && <img className='player-board-btn-restart' src={restartButton} onClick={onRestartGame} alt="restart" />}                
            </Board>
        </div>
    );
};

export default PlayerBoard;