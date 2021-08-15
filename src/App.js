import React from 'react'
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        {/* Check Dashboard, if exist isUser will return Dashboard, else redirect to login */}
        <PrivateRoute exact={true} path='/'>
          <Dashboard></Dashboard>
        </PrivateRoute>
        <Route path='/login'>
          <Login></Login>
        </Route>
        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
