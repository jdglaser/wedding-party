import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Route, BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <div className="App">
        <div className='content'>
          <App />
        </div>
      </div>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
)
