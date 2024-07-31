import React, { useState } from "react";
import "../../style.css";
const EmployeeModal = ({ employee, isEditing, onClose, onSave }) => {
    const [depError, setDepError] = useState("");
  
    const [formData, setFormData] = useState({
      empNo: employee ? employee.empNo : "",
      empName: employee ? employee.empName : "",
      empAddressLine1: employee ? employee.empAddressLine1 : "",
      empAddressLine2: employee ? employee.empAddressLine2 : "",
      empAddressLine3: employee ? employee.empAddressLine3 : "",
      departmentCode: employee ? employee.departmentCode : "",
      dateOfJoin: employee ? employee.dateOfJoin : "",
      dateOfBirth: employee ? employee.dateOfBirth : "",
      basicSalary: employee ? employee.basicSalary : "",
      isActive: employee ? employee.isActive : false,
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
  
      if (name === "departmentCode" && isNaN(value)) {
        setDepError("Department number should be a number");
      } else {
        setDepError("");
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>{isEditing ? "Edit Employee" : "Add Employee"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Employee No:</label>
              <input
                type="text"
                name="empNo"
                value={formData.empNo}
                onChange={handleChange}
                className="form-input"
                required
                disabled={isEditing}
              />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="empName"
                value={formData.empName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Address Line 1:</label>
              <input
                type="text"
                name="empAddressLine1"
                value={formData.empAddressLine1}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Address Line 2:</label>
              <input
                type="text"
                name="empAddressLine2"
                value={formData.empAddressLine2}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Address Line 3:</label>
              <input
                type="text"
                name="empAddressLine3"
                value={formData.empAddressLine3}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Department Code:</label>
              <input
                type="text"
                name="departmentCode"
                value={formData.departmentCode}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>{" "}
            {depError && <div style={{ color: "red" }}>{depError}</div>}
            <div className="form-group">
              <label>Date of Joining:</label>
              <input
                type="date"
                name="dateOfJoin"
                value={formData.dateOfJoin}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Basic Salary:</label>
              <input
                type="number"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Active:</label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="form-checkbox"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="button save-button">
                Save
              </button>
              <button
                type="button"
                onClick={onClose}
                className="button cancel-button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default EmployeeModal;