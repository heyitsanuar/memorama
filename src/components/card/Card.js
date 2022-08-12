import './style.scss';

const Card = ({ card, cardCover, isSelected, onClick }) => {
    return (
        <div className='card' onClick={onClick}>
            <div className={`card-wrapper ${isSelected && 'card-wrapper--rotated'}`}>
                <div className='card-front'>
                    <img className="card-image card-image--cover" src={cardCover.img} alt={cardCover.name} />
                </div>
                <div className='card-back'>
                    <h4 className='card-title'>{card.name}</h4>
                    <img className="card-image" src={card.img} alt={card.name} />
                </div>
            </div>
        </div>
    );
};

export default Card;