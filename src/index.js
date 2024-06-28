import { Buffer } from 'buffer';
import process from 'process';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

window.Buffer = Buffer;
window.process = process;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
