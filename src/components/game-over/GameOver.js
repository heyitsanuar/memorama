import trophyImage from './winner.gif';
import './style.scss';

const GameOver = ({ winnerName = '', onClick }) => {
    return (
        <div className='game-over'>
            <div className='game-over-modal'>
                <div className='game-over-container'>
                    <div className='game-over-heading'>
                        <h1>{winnerName} has won!</h1>
                        <span className='game-over-btn-close' onClick={onClick}>&times;</span>
                    </div>
                    <img className='game-over-trophy' src={trophyImage} alt={`${winnerName} is the winner.`} />
                </div>
            </div>
        </div>
    );
};

export default GameOver