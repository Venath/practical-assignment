import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeManager from './components/Employee/EmployeeManager';
import DepartmentsList from './components/Departments/DepartmentsList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmployeeManager/>} />
        <Route path="/department" element={<DepartmentsList />} />
      </Routes>
    </Router>
  );
}

export default App;
