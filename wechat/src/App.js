import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import Dashboard  from 'component/Dashboard'

import main  from 'app/main'
import intr  from 'app/intr'
import exam  from 'app/exam'
import appy  from 'app/appy'
import brad  from 'app/brad'
import coop  from 'app/coop'
import plan  from 'app/plan'
import sche  from 'app/sche'
import serv  from 'app/serv'
import heat  from 'app/heat'
import step  from 'app/step'
import cont  from 'app/cont'



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
                  <Route exact path='/intr'  component={intr}/>
                  <Route exact path='/exam'  component={exam}/>
                  <Route exact path='/appy'  component={appy}/>
                  <Route exact path='/brad'  component={brad}/>
                  <Route exact path='/coop'  component={coop}/>
                  <Route exact path='/plan'  component={plan}/>
                  <Route exact path='/sche'  component={sche}/>
                  <Route exact path='/serv'  component={serv}/>
                  <Route exact path='/heat'  component={heat}/>
                  <Route exact path='/step'  component={step}/>
                  <Route exact path='/cont'  component={cont}/>
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
