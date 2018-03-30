import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Course from './components/course_card';
import Header from './components/header';
// import _Header from './components/_header';
class App extends Component {
  constructor(){
    super();
    window.context={};
    window.context.api='http://localhost:3000/api/v1/';
    window.context.image_api='http://localhost:3000/images/';
  }
  render() {
    return (
      <div className="App">
      <Header/>
      </div>
    );
  }
}

export default App;
