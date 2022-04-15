import React, { useEffect, useState } from 'react';
import './App.css';
import SnippetSelector from './SnippetSelector';

const App = () => {

  const initialGameState = {
    victory: false,
    startTime: null,
    endTime: null
  }
  const [snippet, setSnippet] = useState('');
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState(initialGameState);
  const [hasError, setErrors] = useState(false);
  const [films, setFilms] = useState([]);
  const updateUserText = event => {
    setUserText(event.target.value);

    if(event.target.value === snippet) {
      setGameState({
        ...gameState,
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
      });
    }
  };
  const chooseSnippet = selectedSnippet => {
    setSnippet(selectedSnippet);
    setGameState({ ...gameState, startTime: new Date().getTime() });
  };

  const fetchData = async() => {
    const response = await fetch("https://ghibliapi.herokuapp.com/films?limit=3");
    response
      .json()
      .then(response => setFilms(response))
      .catch(err => setErrors(err));
  };

  useEffect(() => {
    if(gameState.victory) {
      document.title = 'Victory!';
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Type Race</h2>
      <hr />
      <h3>Snippet</h3>
      <div>{snippet}</div>
      <h4>{gameState.victory ? `Done! Woot! Time: ${gameState.endTime}ms` : null}</h4>
      <input value={userText} onChange={updateUserText} />
      <hr />
      <SnippetSelector chooseSnippet={chooseSnippet} films={films}/>
      <>{hasError ? 'An error has occurred': null}</>
    </div>
  )
}

export default App;
