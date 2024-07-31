import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/v1.0/Employees', {
          headers: {
            'apiToken': '?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQf'
          }
        });
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching employees');
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Employee List</h2>
      <ul className="list-disc pl-5">
        {employees.map(employee => (
          <li key={employee.empNo} className="mb-2">
          <p><strong>Employee No:</strong> {employee.empNo}</p>
          <p><strong>Name:</strong> {employee.empName}</p>
          <p><strong>Address Line 1:</strong> {employee.empAddressLine1}</p>
          <p><strong>Address Line 2:</strong> {employee.empAddressLine2}</p>
          <p><strong>Address Line 3:</strong> {employee.empAddressLine3}</p>
          <p><strong>Department Code:</strong> {employee.departmentCode}</p>
          <p><strong>Date of Joining:</strong> {new Date(employee.dateOfJoin).toLocaleDateString()}</p>
          <p><strong>Date of Birth:</strong> {new Date(employee.dateOfBirth).toLocaleDateString()}</p>
          <p><strong>Basic Salary:</strong> {employee.basicSalary}</p>
          <p><strong>Active:</strong> {employee.isActive ? 'Yes' : 'No'}</p>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
