import React from 'react';

import Header from './Components/Header';
import NewsToggle from './Components/NewsToggle'
import NewsItems from './Components/NewsItems'

import './App.css';
import GlobalState from './context/GlobalState';

const App = props => {



  return (
    <GlobalState>
      <Header {...props} />
      <NewsToggle {...props} />
      <NewsItems {...props} />
    </GlobalState>
  );
}

export default App;
