import React from 'react'
import ReactDOM from 'react-dom'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App'

// option for alerts
const options = {
  position: positions.TOP_CENTER,
  transition: transitions.FADE,
  timeout: 2000
}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
