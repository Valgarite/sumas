import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectsPage from './ProjectsPage';
import SumasPage from './sumas/Sumas';
import Page from './sumas/Sumas';
import Header from './info/Header';

function App() {
  return (<>
    <div className='info'>
      <Header/>
    </div>
    <div className='juego'>
      <SumasPage/>
    </div>
    </>
  );
}

export default App;
