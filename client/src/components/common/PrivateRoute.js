import React, { useContext } from 'react'
import UsersContext from '../../context/users/usersContext'
import { Route } from 'react-router-dom'
import Register from '../users/Register'

const PrivateRoute = ({ component, ...rest }) => {
  const usersContext = useContext(UsersContext)

  const { isAuthenticated } = usersContext

  const finalComponent = isAuthenticated ? component : Register

  return <Route {...rest} component={finalComponent} />
}

export default PrivateRoute
