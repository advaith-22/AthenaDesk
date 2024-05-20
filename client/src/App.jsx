import Header from './components/header.component';
import CreateTicket from './pages/ticket.page'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home.page'
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/register.page';
import Login from './pages/login.page'
import React from 'react'

function App() {
  return (
  <div>
    <Header></Header>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createticket" element={<CreateTicket/>}/>
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App