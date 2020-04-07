import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './services/serviceWorker';
import UserProvider from './UserProvider'
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
// this is the top of the heiarchy, the root of the tree
// please refrain from making any modifications
