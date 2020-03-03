import React from 'react';
import './style.sass';
import axios from 'axios';
import Dashboard from './components/Dashboard.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Dashboard />
      </>
    );
  }
}

export default App;
