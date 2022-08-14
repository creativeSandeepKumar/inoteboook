
import React, { useState } from 'react';
import { Navbar, Home, About, NoteState, Alert, Login, Signup } from "./component";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";


const App = () => {
const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }


  return (
   
<>
{/* <Home/> */}
<NoteState>
  <BrowserRouter>
  <Navbar/>
  <Alert alert={alert} />
  
  <main className="app-container">
  <Routes>
    <Route exact path='/' element={ <Home showAlert={showAlert} /> } />
    <Route exact path='/about' element={ <About showAlert={showAlert} /> } />
    <Route exact path='/login' element={ <Login showAlert={showAlert} /> } />
    <Route exact path='/signup' element={ <Signup showAlert={showAlert} /> } />
  </Routes>
  </main>
  </BrowserRouter>
</NoteState>
</>
  )
}

export default App