import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './services/serviceWorker';
import UserProvider from './components/UserProvider';
ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App  />
      </BrowserRouter> 
    </UserProvider>   
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
// this is the top of the heiarchy, the root of the tree
// please refrain from making any modifications
// userProvider component keeps track of user session and manages its state
// browserRouter is where the routing functionality in the app component is inherited from
