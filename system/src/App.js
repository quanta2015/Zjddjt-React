import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import Dashboard  from 'component/Dashboard'

import main  from 'app/main'
import appy  from 'app/appy'
import brad  from 'app/brad'
import sche  from 'app/sche'
import coop  from 'app/coop'
import serv  from 'app/serv'


class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' render={() => (
            <div className='app-root'>
              <Dashboard>
                <Switch>
                  <Route exact path='/'      component={main}/>
                  <Route exact path='/appy'  component={appy}/>
                  <Route exact path='/brad'  component={brad}/>
                  <Route exact path='/sche'  component={sche}/>
                  <Route exact path='/coop'  component={coop}/>
                  <Route exact path='/serv'  component={serv}/>
                </Switch>
              </Dashboard>
            </div>
           )} />
        </Switch>
      </Router>
    )
  }
}

export default App;
