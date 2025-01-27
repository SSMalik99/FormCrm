// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Views/Layout'
import Home from './Views/Home'
import Register from './Views/Auth/Register'
import Login from './Views/Auth/Login'
import FormList from './Views/Forms/FormList'
import CreateForm from './Views/Forms/CreateForm'
import UpdateForm from './Views/Forms/UpdateForm'
import { useContext } from 'react'
import { AuthUserContext } from './Provider/AuthUserContext'
import FormShare from './Views/Forms/FormShare'

function App() {
  
  const authContext = useContext(AuthUserContext);
  const user = authContext ? authContext.user : null;

  return (
    
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          
          <Route index element={<Home />} />

          <Route path="/guest" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />

          <Route path="/forms" element={user ? <FormList /> : <Login />} />
          <Route path="/forms/view/:id" element={user ? <FormShare /> : <Login />} />
          <Route path="/forms/create" element={user ? <CreateForm /> : <Login />} />
          <Route path="/forms/update/:id" element={user ? <UpdateForm /> : <Login />} />


        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
