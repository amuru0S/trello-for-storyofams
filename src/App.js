import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import BoardContainer from './components/Board/BoardContainer';


class App extends Component {
  render() {
    return (
      <div className="App">
       <Header />
       <BoardContainer />
      </div>
    );
  }
}

export default App;
