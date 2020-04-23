import React, { Fragment } from 'react'
import './main.css'

import Navbar from './components/layout/Navbar'
import Home from './components/pages/Home'
import Listings from './components/pages/Listings'
import ListingForm from './components/pages/ListingForm'
import Listing from './components/listings/Listing'
import Register from './components/users/Register'
import Login from './components/users/Login'
import FileUploadForm from './components/file-upload/FileUploadForm'

import UsersState from './context/users/UsersState'
import ListingsState from './context/listings/ListingsState'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'

function App () {
  return (
    <UsersState>
      <ListingsState>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/listings' exact component={Listings} />
              <Route path='/listings/form' exact component={ListingForm} />
              <Route path='/listings/:id' exact component={Listing} />
              <Route path='/register' exact component={Register} />
              <Route path='/login' exact component={Login} />
              <Route
                path='/listings/form/:id'
                exact
                component={FileUploadForm}
              />
            </Switch>
          </Fragment>
        </Router>
      </ListingsState>
    </UsersState>
  )
}

export default App
