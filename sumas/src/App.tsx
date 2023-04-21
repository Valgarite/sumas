import React from 'react';
import './App.css';
import SumasPage from './sumas/Sumas';
import Header from './info/Header';

function App() {
  return (<>
    <div className='juego'>
      <Header/>
      <SumasPage/>
    </div>
  </>
  );
}

export default App;
