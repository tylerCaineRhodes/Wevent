import React from 'react';
import './style.sass';
import axios from 'axios';
import ModalReuseable from './components/ModalReuseable.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <ModalReuseable />
      </>
    );
  }
}

export default App;
