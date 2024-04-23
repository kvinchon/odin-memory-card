import { useEffect, useState } from 'react';
import { Pokedex } from 'pokeapi-js-wrapper';
import Card from './components/Card';
import './App.css';

function App() {
  const [memory, setMemory] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const fetchPokedex = async () => {
    const P = new Pokedex();
    const ids = Array.from({ length: 18 }, (_, i) => i + 1);
    return await P.getPokemonByName(ids);
  };

  const shuffle = (array) => {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    setMemory(array);
  };

  const handleClick = (id) => {
    // check if image has already been clicked
    if (clicked.includes(id)) {
      // restart game
      if (score > bestScore) setBestScore(score);
      setScore(0);
      setClicked([]);
    } else {
      setScore((score) => score + 1);
      setClicked((clicked) => [...clicked, id]);
    }

    shuffle(memory);
  };

  useEffect(() => {
    fetchPokedex().then((response) => {
      const data = response.reduce((prev, current) => {
        prev.push({
          id: current.id,
          name: current.name.charAt(0).toUpperCase() + current.name.slice(1),
          url: current.sprites.front_default,
        });

        return prev;
      }, []);

      setMemory(data);
    });
  }, []);

  return (
    <div className="app">
      <header>
        <div className="title">
          <h1>Pokemon Memory Game</h1>
          <p>
            Get points by clicking on an image but don&apos;t click on any more
            than once!
          </p>
        </div>
        <div className="scoreboard">
          <div>Score: {score}</div>
          <div>Best score: {bestScore}</div>
        </div>
      </header>
      <main>
        <div className="memory">
          {memory.map((pokemon) => (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              title={pokemon.name}
              url={pokemon.url}
              onClick={handleClick}
            />
          ))}
        </div>
      </main>
      <footer>
        Powered by{' '}
        <a href="https://pokeapi.co/" target="_blank">
          PokeAPI
        </a>{' '}
        🚀
      </footer>
    </div>
  );
}

export default App;
