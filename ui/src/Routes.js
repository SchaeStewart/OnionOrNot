import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import About from './containers/About'
import HowToPlay from './containers/HowToPlay'

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/about" exact component={About} />
    <Route path="/how-to-play" exact component={HowToPlay} />
  </Switch>
)

export default Routes
