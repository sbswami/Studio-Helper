import '../assets/css/App.css';
import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Account from './register/Account';
import Home from './home/Home';

class App extends React.Component {
  render() {
    return (
      <Home />
    );
  }
}

export default App;
