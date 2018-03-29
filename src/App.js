import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Course from './components/course_card';
import Header from './components/header';
// import _Header from './components/_header';
class App extends Component {
  render() {
    return (
      <div className="App">
      <Header/>
      </div>
    );
  }
}

export default App;
