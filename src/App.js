import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Course from './components/course_card';
import Home from './components/home';
import axios from 'axios';
// import _Header from './components/_header';
const host="localhost";
const port="3000";
class App extends Component {
  constructor(){
    super();
    window.context={};
    window.context.api=`http://${host}:${port}/api/v1/`;
    window.context.image_api=`http://${host}:${port}/images/`;
    window.context.axios=axios;
  }
  render() {
    return (
      <div className="App">
      <Home/>
      </div>
    );
  }
}

export default App;
