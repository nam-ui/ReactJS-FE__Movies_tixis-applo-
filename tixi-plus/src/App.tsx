import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// * CSS 
import './App.scss';
import './theme/components.scss';
// ANCHOR files
import Home from './pages/Home';
import Pages404 from './pages/Pages404';
import CreateMovie from './pages/CreateMovie';


function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>

          <Route path="/create-movie" component={CreateMovie} />
          <Route exact path="/" component={Home} />
          <Route component={Pages404} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

export default App
