import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'typeface-roboto';
import RouterEntry from './router';

ReactDOM.render(<RouterEntry />, document.getElementById('root'));
registerServiceWorker();
