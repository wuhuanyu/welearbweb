import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import axios from 'axios';
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
