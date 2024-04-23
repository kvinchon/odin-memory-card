import '../styles/card.css';

function Card({ id, title, url, onClick }) {
  return (
    <div className="card" onClick={() => onClick(id)}>
      <div
        className="sprite"
        style={{ backgroundImage: 'url(' + url + ')' }}
      ></div>
      <h2>{title}</h2>
    </div>
  );
}

export default Card;
