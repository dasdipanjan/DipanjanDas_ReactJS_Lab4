import React from 'react';
import { Routes, Route } from "react-router-dom"
import { ExpenseTrackerHome } from './components/ExpenseTrackerHome';

import "bootstrap/dist/css/bootstrap.min.css"
import { Login } from './components/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/home' element={<ExpenseTrackerHome></ExpenseTrackerHome>}></Route>
      </Routes>
    </div>
  );
}

export default App;
