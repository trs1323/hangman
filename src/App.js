import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './componentts/Header';
import Figure from './componentts/Figure'
import WrongLetters from './componentts/WrongLetters';
import Word from './componentts/Word';
import Notification from './componentts/Notification';
import PopUp from './componentts/PopUp'
import { showNotification as show } from './helpers/Helpers';

const category = ['Programming Key Words', 'Programming Languages', 'Animals', 'Best selling video games'];
const programming = ['application', 'experience', 'interface', 'terminal'];
const languages = ['javascript', 'python', 'java', 'csharp'];
const animals = ['owl', 'mouse', 'cheetah', 'hippo'];
const games = ['minecraft', 'tetris', 'pokemon', 'frogger']

let selectedCategory = category[Math.floor(Math.random() * category.length)];

let selectedWord;

if (selectedCategory === 'Programming Key Words') {
  selectedWord = programming[Math.floor(Math.random() * programming.length)]
} else if (selectedCategory === 'Programming Languages') {
  selectedWord = languages[Math.floor(Math.random() * languages.length)]
} else if (selectedCategory === 'Animals') {
  selectedWord = animals[Math.floor(Math.random() * animals.length)]
} else if (selectedCategory === 'Best selling video games') {
  selectedWord = games[Math.floor(Math.random() * games.length)]
}


function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeyDown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetter => [...currentLetter, letter]);
          } else {
            show(setShowNotification)
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(wrongLetter => [...wrongLetter, letter]);

          } else {
            show(setShowNotification)
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);

  }, [correctLetters, wrongLetters, playable])

  function playAgain() {
    setPlayable(true);

    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * category.length);
    selectedCategory = category[random];
    if (selectedCategory === 'Programming Key Words') {
      selectedWord = programming[Math.floor(Math.random() * programming.length)]
    } else if (selectedCategory === 'Programming Languages') {
      selectedWord = languages[Math.floor(Math.random() * languages.length)]
    } else if (selectedCategory === 'Animals') {
      selectedWord = animals[Math.floor(Math.random() * animals.length)]
    } else if (selectedCategory === 'Best selling video games') {
      selectedWord = games[Math.floor(Math.random() * games.length)]
    }
  }

  return (
    <>
      <Header selectedCategory={selectedCategory} />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />

      </div>
      <PopUp correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;
