import React, { createContext, useContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import Header from './components/Header/Header';

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  // useContext to get accessible state over the app
  const UserContext = useContext();
  return (
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
          <Header/>
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/book/:bedType">
              <Book />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
      </Router>
  );
}

export default App;
