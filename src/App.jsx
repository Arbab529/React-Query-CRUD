import './App.css'
import { Routes, Route } from 'react-router-dom';
import Employees from './Pages/Employees';
import EmpDetails from './Pages/EmpDetails';
import Edit from './Pages/Edit';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Employees />} />
      <Route path="/employee/:id" element={<EmpDetails />} />
      <Route path="/employee/:id/edit" element={<Edit />} />
    </Routes>
  )
}

export default App
