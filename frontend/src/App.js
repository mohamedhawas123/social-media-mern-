import logo from './logo.svg';
import './App.css';
import Landing from './components/layout/landing'
import NavBar from './components/layout/navbar';
import React from 'react';
import {BrowserRouter as Router ,Route, Routes} from 'react-router-dom'
import Login from './components/auth/login';
import Register from './components/auth/register';




const App = ()=> {
   return (
   <Router>
    <React.Fragment>
    <NavBar />

    <Routes>
    <Route exact path='/' element={<Landing />} />
    
    
    <Route exact path='/login' element={<Login />} />
    <Route exact path='/register' element={<Register />} />
    </Routes>


   </React.Fragment >
   </Router>
  );
}

export default App;
