import React,{ Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard  from 'component/Dashboard'

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
                <Suspense fallback={<div>Loading...</div>}>
                  <Switch>
                    <Route exact path='/intr'  component={lazy(() => import('app/intr'))}/>
                    <Route exact path='/exam'  component={lazy(() => import('app/exam'))}/>
                    <Route exact path='/appy'  component={lazy(() => import('app/appy'))}/>
                    <Route exact path='/brad'  component={lazy(() => import('app/brad'))}/>
                    <Route exact path='/coop'  component={lazy(() => import('app/coop'))}/>
                    <Route exact path='/plan'  component={lazy(() => import('app/plan'))}/>
                    <Route exact path='/sche'  component={lazy(() => import('app/sche'))}/>
                    <Route exact path='/serv'  component={lazy(() => import('app/serv'))}/>
                    <Route exact path='/heat'  component={lazy(() => import('app/heat'))}/>
                    <Route exact path='/step'  component={lazy(() => import('app/step'))}/>
                    <Route exact path='/cont'  component={lazy(() => import('app/cont'))}/>
                  </Switch>
                </Suspense>
              </Dashboard>
            </div>
           )} />
        </Switch>
      </Router>
    )
  }
}

export default App;
