import React from 'react';
import './style.sass';
import axios from 'axios';
import MainPage from './components /MainPage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <><MainPage /></>;
  }
}

export default App;
