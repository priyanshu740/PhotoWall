import React  from 'react'
import {BrowserRouter as Router, useNavigate, Route , Routes } from 'react-router-dom'
import { CreatePost } from './components'
import Login from './components/Login'
import Home from './conatiner/Home'

const App = () => {

  return (
    <div className='bg-stone-400'>
      <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<Home />} />
      </Routes>    
      </Router>
    </div >
  )
}

export default App
