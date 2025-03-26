import { useState } from 'react'
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import './App.css'
import Home from './page/Home'
import {Toaster} from 'react-hot-toast'
import Signin from './page/Signin'
import Signup from './page/Signup'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/Todo' element={<Home />} />
        <Route path='/sigin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>

      <Toaster position='bottom-center' />

    </Router>

    </>
  )
}

export default App
