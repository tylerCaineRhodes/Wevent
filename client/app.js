import React from 'react';
import './style.sass';
import axios from 'axios';
import EventInfo from './components/EventInfo.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <EventInfo />
      </>
    );
  }
}


export default App;