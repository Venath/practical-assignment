import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../style.css";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/api/v1.0/Departments', {
          headers: {
            'apiToken': '?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQf'
          }
        });
        setDepartments(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching departments');
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='dep'>
      <h1>Departments</h1>
      <ul>
        {departments.map(department => (
          <li key={department.departmentCode}>
            {department.departmentName} ({department.departmentCode})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;
