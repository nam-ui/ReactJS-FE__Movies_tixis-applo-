import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
// * CSS 
import './App.scss';
// ANCHOR files
import Home from './pages/Home';
import Pages404 from './pages/Pages404';
import MasterMovie from './pages/MasterMovie';
import Login from './pages/Login';

const client = new ApolloClient({
  uri: `http://localhost:5030/graphql `,
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/master/movie" component={MasterMovie} />
          <Route path="/login" component={Login} />
          <Route path="/:page" component={Home} />
          <Route component={Pages404} />
        </Switch>
      </Router>
    </ApolloProvider>
  )
}

export default App
