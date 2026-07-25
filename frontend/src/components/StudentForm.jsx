import React, { useState } from "react";

// --- beautiful UI component with validation ---
function StudentForm({ predictStudent, loading }) {
  const [studentData, setStudentData] = useState({
    attendance: "",
    internal1: "",
    internal2: "",
    assignment: "",
    studyhours: ""
  });

  const [errors, setErrors] = useState({
    attendance: "",
    internal1: "",
    internal2: "",
    assignment: "",
    studyhours: ""
  });

  const validateField = (name, value) => {
    const num = parseFloat(value);
    
    if (value === "") return "";
    
    if (isNaN(num)) return "Please enter a valid number";
    
    switch (name) {
      case "attendance":
        if (num < 0 || num > 100) return "Attendance must be between 0 and 100";
        break;
      case "internal1":
      case "internal2":
        if (num < 0 || num > 40) return "Score must be between 0 and 40";
        break;
      case "assignment":
        if (num < 0 || num > 10) return "Score must be between 0 and 10";
        break;
      case "studyhours":
        if (num < 0 || num > 24) return "Study hours must be between 0 and 24";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setStudentData({
      ...studentData,
      [name]: value
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const newErrors = {
      attendance: validateField("attendance", studentData.attendance),
      internal1: validateField("internal1", studentData.internal1),
      internal2: validateField("internal2", studentData.internal2),
      assignment: validateField("assignment", studentData.assignment),
      studyhours: validateField("studyhours", studentData.studyhours)
    };
    
    setErrors(newErrors);
    
    const hasErrors = Object.values(newErrors).some(error => error !== "");
    if (hasErrors) return;
    
    const allFilled = Object.values(studentData).every(val => val !== "");
    if (!allFilled) return;
    
    predictStudent(studentData);
  };

  const hasError = (field) => errors[field] !== "";

  return (
    <div className="form-wrapper">
      <div className="card-header">
        <span className="icon">📊</span>
        <h2>Student Performance</h2>
        <p className="subtitle">
          Predict whether a student will <span className="pass-text">PASS</span> or <span className="fail-text">FAIL</span> using Machine Learning
        </p>
      </div>

      <form onSubmit={handleSubmit} className="student-form">

        <div className="input-group">
          <label><i className="fas fa-user-graduate"></i> Attendance (%)</label>
          <input
            type="number"
            name="attendance"
            placeholder="e.g. 85"
            value={studentData.attendance}
            onChange={handleChange}
            onBlur={handleBlur}
            min="0"
            max="100"
            className={hasError("attendance") ? "error" : ""}
            required
          />
          {errors.attendance && <span className="error-message">{errors.attendance}</span>}
        </div>

        <div className="input-row">
          <div className="input-group half">
            <label><i className="fas fa-pencil-alt"></i> Internal Test 1 (out of 40)</label>
            <input
              type="number"
              name="internal1"
              placeholder="e.g. 32"
              value={studentData.internal1}
              onChange={handleChange}
              onBlur={handleBlur}
              min="0"
              max="40"
              className={hasError("internal1") ? "error" : ""}
              required
            />
            {errors.internal1 && <span className="error-message">{errors.internal1}</span>}
          </div>
          <div className="input-group half">
            <label><i className="fas fa-pencil-alt"></i> Internal Test 2 (out of 40)</label>
            <input
              type="number"
              name="internal2"
              placeholder="e.g. 28"
              value={studentData.internal2}
              onChange={handleChange}
              onBlur={handleBlur}
              min="0"
              max="40"
              className={hasError("internal2") ? "error" : ""}
              required
            />
            {errors.internal2 && <span className="error-message">{errors.internal2}</span>}
          </div>
        </div>

        <div className="input-row">
          <div className="input-group half">
            <label><i className="fas fa-tasks"></i> Assignment Score (out of 10)</label>
            <input
              type="number"
              name="assignment"
              placeholder="e.g. 9"
              value={studentData.assignment}
              onChange={handleChange}
              onBlur={handleBlur}
              min="0"
              max="10"
              className={hasError("assignment") ? "error" : ""}
              required
            />
            {errors.assignment && <span className="error-message">{errors.assignment}</span>}
          </div>
          <div className="input-group half">
            <label><i className="fas fa-clock"></i> Daily Study Hours</label>
            <input
              type="number"
              name="studyhours"
              placeholder="e.g. 4.5"
              value={studentData.studyhours}
              onChange={handleChange}
              onBlur={handleBlur}
              min="0"
              max="24"
              step="0.5"
              className={hasError("studyhours") ? "error" : ""}
              required
            />
            {errors.studyhours && <span className="error-message">{errors.studyhours}</span>}
          </div>
        </div>

        <button type="submit" className="predict-btn" disabled={loading}>
          {loading ? (
            <><span className="spinner"></span> Predicting...</>
          ) : (
            <>🚀 Predict Result</>
          )}
        </button>

        <p className="footnote">* All fields are required and must be within valid ranges</p>
      </form>

      <style>{`
        /* ---- modern, beautiful styles ---- */
        .form-wrapper {
          max-width: 820px;
          width: 100%;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 48px;
          padding: 2.5rem 2.8rem;
          box-shadow: 0 30px 60px -20px rgba(0, 20, 40, 0.3),
                      0 0 0 1px rgba(255, 255, 255, 0.5) inset;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          transition: 0.2s;
        }

        .form-wrapper:hover {
          transform: translateY(-4px);
          box-shadow: 0 40px 80px -20px rgba(0, 20, 40, 0.4),
                      0 0 0 1px rgba(255, 255, 255, 0.6) inset;
        }

        @media (max-width: 550px) {
          .form-wrapper {
            padding: 1.8rem 1.2rem;
            border-radius: 32px;
          }
        }

        .card-header {
          margin-bottom: 2.2rem;
        }

        .card-header .icon {
          font-size: 2.4rem;
          display: block;
          margin-bottom: 0.2rem;
        }

        .card-header h2 {
          font-size: 1.9rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: #0b1e33;
          margin: 0 0 0.15rem 0;
        }

        .subtitle {
          font-size: 1rem;
          font-weight: 500;
          margin: 0;
          color: #2c3f5a;
          opacity: 0.9;
        }

        .subtitle .pass-text {
          color: #059669;
          font-weight: 700;
          text-shadow: 0 0 20px rgba(5, 150, 105, 0.15);
        }

        .subtitle .fail-text {
          color: #dc2626;
          font-weight: 700;
          text-shadow: 0 0 20px rgba(220, 38, 38, 0.15);
        }

        .student-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .input-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1d334b;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .input-group label i {
          color: #2a5a8a;
          width: 18px;
          font-size: 0.95rem;
        }

        .input-group input {
          width: 100%;
          padding: 0.85rem 1.2rem;
          border-radius: 20px;
          border: 1.5px solid #d9e2ed;
          background: white;
          font-size: 1rem;
          font-weight: 500;
          color: #0b1e33;
          transition: 0.2s;
          outline: none;
          box-shadow: 0 2px 6px rgba(0, 20, 30, 0.04);
        }

        .input-group input:focus {
          border-color: #2a5a8a;
          box-shadow: 0 4px 12px rgba(42, 90, 138, 0.15);
          background: #fbfdff;
        }

        .input-group input::placeholder {
          color: #8da0b8;
          font-weight: 400;
          opacity: 0.7;
        }

        /* Error states */
        .input-group input.error {
          border-color: #dc2626;
          background: #fef2f2;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
        }

        .input-group input.error:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.15);
        }

        .error-message {
          color: #dc2626;
          font-size: 0.8rem;
          font-weight: 500;
          margin-top: 0.2rem;
          padding-left: 0.5rem;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .input-row {
          display: flex;
          gap: 1.2rem;
        }

        .input-group.half {
          flex: 1;
        }

        @media (max-width: 480px) {
          .input-row {
            flex-direction: column;
            gap: 1.2rem;
          }
        }

        .predict-btn {
          margin-top: 0.8rem;
          padding: 1rem 1.8rem;
          background: linear-gradient(135deg, #1d3f6e 0%, #2a5a8a 100%);
          border: none;
          border-radius: 40px;
          color: white;
          font-size: 1.2rem;
          font-weight: 700;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          transition: 0.25s;
          box-shadow: 0 8px 20px -6px rgba(26, 67, 113, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .predict-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #16345a 0%, #1f4a77 100%);
          transform: scale(1.01);
          box-shadow: 0 12px 28px -8px rgba(18, 52, 94, 0.5);
        }

        .predict-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .predict-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          filter: grayscale(0.3);
        }

        .spinner {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 3px solid rgba(255, 255, 255, 0.25);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .footnote {
          margin: 0.7rem 0 0 0;
          font-size: 0.8rem;
          color: #5c738e;
          text-align: center;
          font-weight: 500;
          opacity: 0.7;
          letter-spacing: 0.2px;
        }

        .input-group input[type="number"] {
          -moz-appearance: textfield;
        }
        .input-group input[type="number"]::-webkit-outer-spin-button,
        .input-group input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

export default StudentForm;