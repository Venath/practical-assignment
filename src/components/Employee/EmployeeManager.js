import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../style.css";
import EmployeeModal from "./EmployeeModal";
const apiKey = "?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQf";

const EmployeeManager = () => {


  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  //fetch employee data
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("/api/v1.0/Employees", {
        headers: {
          apiToken: apiKey,
        },
      });
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching employees");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Function to handle `Esc` key press
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    // Add event listener if modal is open
    if (showModal) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Clean up event listener when modal is closed
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  const addEmployee = async (employee) => {
    try {
      await axios.post("/api/v1.0/Employee", employee, {
        headers: {
          apiToken: apiKey,
        },
      });
      fetchEmployees();
      setShowModal(false);
    } catch (error) {
      setError("Error adding employee");
    }
  };

  const dep = () => {
    window.location.href = "/department";
  };

  const editEmployee = async (employee) => {
    try {
      await axios.put(`/api/v1.0/Employee/${employee.empNo}`, employee, {
        headers: {
          apiToken: apiKey,
        },
      });
      fetchEmployees();
      setShowModal(false);
    } catch (error) {
      setError("Error editing employee");
    }
  };

  const deleteEmployee = async (empNo) => {
    try {
      const e = empNo;
      await axios.delete(`/api/v1.0/Employee/${empNo}`, {
        headers: {
          apiToken: apiKey,
        },
      });
      alert(`Successfully Deleted employee ${e}`);
      fetchEmployees();
    } catch (error) {
      setError("Error deleting employee");
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.empName.toLowerCase().includes(search.toLowerCase())
  );

  const handleModalOpen = (employee = null) => {
    setCurrentEmployee(employee);
    setIsEditing(!!employee);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setCurrentEmployee(null);
    setShowModal(false);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="container">
      <h2 className="header">
        <h3>Employee Manager</h3>
      </h2>
      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search an employee by name"
          className="search-input"
        />
      </div>
      <div className="add-button">
        <button onClick={() => handleModalOpen()} className="button add-button">
          Add Employee
        </button>
        <button className="button add-button" onClick={dep}>
          Departments
        </button>
      </div>
      <div className="table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee No</th>
              <th>Name</th>
              <th>Address Line 1</th>
              <th>Address Line 2</th>
              <th>Address Line 3</th>
              <th>Department Code</th>
              <th>Date of Joining</th>
              <th>Date of Birth</th>
              <th>Basic Salary</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.empNo}>
                <td>{employee.empNo}</td>
                <td>{employee.empName}</td>
                <td>{employee.empAddressLine1}</td>
                <td>{employee.empAddressLine2}</td>
                <td>{employee.empAddressLine3}</td>
                <td>{employee.departmentCode}</td>
                <td>{new Date(employee.dateOfJoin).toLocaleDateString()}</td>
                <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                <td>{employee.basicSalary}</td>
                <td>{employee.isActive ? "Yes" : "No"}</td>
                <td>
                  <button
                    onClick={() => handleModalOpen(employee)}
                    className="button edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteEmployee(employee.empNo)}
                    className="button delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <EmployeeModal
          employee={currentEmployee}
          isEditing={isEditing}
          onClose={handleModalClose}
          onSave={isEditing ? editEmployee : addEmployee}
        />
      )}
    </div>
  );
};


export default EmployeeManager;
