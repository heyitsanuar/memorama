import RegisterPlayer from "../../components/register-player/register-player";
import startBtn from './start.png';
import './style.scss';

const Intro = ({ players, setPlayers, setIsGameRunning }) => {
    const onAddPlayer = (e) => {
        const { value } = e.target.name;

        e.preventDefault();
        e.target.reset();

        setPlayers(prev => {
            const newPlayer = {
                id: prev.length + 1,
                name: value,
                score: 0
            };

            return [...prev, newPlayer];
        });
    };

    const onStartGame = () => {
        setIsGameRunning(true);
    };

    return (
        <div className='intro-wrapper'>
            <h1 className='intro-title'>Memorama</h1>
            <RegisterPlayer players={players} maxPlayers={4} onAddPlayer={onAddPlayer} />
            <img  className='intro-btn-start' src={startBtn} onClick={onStartGame} alt="start"/>
        </div>
    );
};

export default Intro;