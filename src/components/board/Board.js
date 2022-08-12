import './style.scss';

const Board = ({ players, currentPlayerName = '', children }) => {
    return (
        <div className='board'>
            <div className='board-wrapper'>
                <h2 className='board-next-turn'>{currentPlayerName} it's your turn</h2>
                <div>
                    <h1>Score</h1>
                    <div className='board-player-list'>
                        {players.map(player => (
                            <div key={player.id} className='board-player'>
                                <div className='board-player-name'>
                                    <h4>{player.name}</h4>
                                </div>
                                <div className='board-player-score'>
                                    <span>{player.score}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {children}
        </div>
    );
};

export default Board;