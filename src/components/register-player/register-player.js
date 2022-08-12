import './style.scss';

const RegisterPlayer = ({ players, maxPlayers, onAddPlayer }) => {
    return (
        <div className="register-player">
            <h4>Enter the players:</h4>
            <p>A maximum of 4 players can play</p>
            <h4>The next players will prepare for this adventure:</h4>
            <ul className='register-player-list'>
                {players.map((player) => (
                    <li key={player.id}>{player.name}</li>
                ))}
            </ul>
            {players.length < maxPlayers && (
                <form onSubmit={onAddPlayer}>
                    <h5>Enter a new player</h5>
                    <div>
                        <input type="text" name="name" className='register-player-name'/>
                        <input id="submitForm" className="register-player-add" type="submit" value="Add" />
                    </div>
                </form>
            )}
        </div>
    );
};

export default RegisterPlayer;