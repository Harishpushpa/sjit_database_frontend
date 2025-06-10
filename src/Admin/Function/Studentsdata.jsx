import React, { useEffect, useState } from "react";
import "../cssforAdmin/Studentsdata.css";
import { useNavigate } from "react-router-dom";

const Studentsdata = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const navigate = useNavigate();


  // Filter states
  const [arrearsHistory, setArrearsHistory] = useState("");
  const [currentArrearsValue, setCurrentArrearsValue] = useState("");
  const [currentArrearsCompare, setCurrentArrearsCompare] = useState("above");
  const [tenthMark, setTenthMark] = useState("");
  const [tenthCompare, setTenthCompare] = useState("above");
  const [twelfthMark, setTwelfthMark] = useState("");
  const [twelfthCompare, setTwelfthCompare] = useState("above");
  const [selectedBatch, setSelectedBatch] = useState("");

  // Extract unique batches from student data
  const availableBatches = [...new Set(students.map(student => student.batch || ""))]
    .filter(batch => batch !== "")
    .sort();

  const fieldGroups = {
    basic: {
      title: "Basic Information",
      fields: [
        { key: "email", label: "Email" },
        { key: "firstName", label: "First Name" },
        { key: "lastName", label: "Last Name" },
        { key: "dob_ddmmyy", label: "Date of Birth (DDMMYY)" },
        { key: "title", label: "Title" },
        { key: "gender", label: "Gender" },
        { key: "college", label: "College" },
        { key: "department", label: "Department" },
        { key: "section", label: "Section" },
        { key: "yearOfAdmission", label: "Admission Year" },
        { key: "batch", label: "Batch" }
      ]
    },
    academic: {
      title: "School Academics",
      fields: [
        { key: "tenthPercentage", label: "10th Percentage" },
        { key: "tenthBoardOfStudy", label: "10th Board" },
        { key: "tenthSchoolName", label: "10th School" },
        { key: "tenthMediumOfStudy", label: "10th Medium" },
        { key: "tenthYearOfPassing", label: "10th Year" },
        { key: "tenthGraduatingState", label: "10th State" },
        { key: "twelfthPercentage", label: "12th Percentage" },
        { key: "twelfthBoardOfStudy", label: "12th Board" },
        { key: "twelfthSchoolName", label: "12th School" },
        { key: "twelfthMediumOfStudy", label: "12th Medium" },
        { key: "twelfthYearOfPassing", label: "12th Year" },
        { key: "twelfthGraduatingState", label: "12th State" }
      ]
    },
    diploma: {
      title: "Diploma Details",
      fields: [
        { key: "diplomaSpecialization", label: "Specialization" },
        { key: "diplomaGraduatingState", label: "State" },
        { key: "diplomaPercentage", label: "Percentage" },
        { key: "diplomaYearOfPassing", label: "Year" }
      ]
    },
    ug: {
      title: "Undergraduate Details",
      fields: [
        { key: "instituteName", label: "Institute" },
        { key: "ugCollege", label: "College" },
        { key: "ugGraduatingState", label: "State" },
        { key: "ugGraduatingUniversity", label: "University" },
        { key: "ugBranch", label: "Branch" },
        { key: "ugDegree", label: "Degree" },
        { key: "ugPercentage", label: "Percentage" },
        { key: "ugCGPA", label: "CGPA" },
        { key: "ugYearOfPassing", label: "Year" },
        { key: "historyOfArrears", label: "Arrears History" },
        { key: "numOfArrears", label: "Arrears Count" }
      ]
    },
    performance: {
      title: "Academic Performance",
      fields: [
        { key: "overallCGPA", label: "Overall CGPA" },
        { key: "totalStandingArrears", label: "Current Arrears" },
        { key: "sem1GPA", label: "Sem 1 GPA" },
        { key: "sem2GPA", label: "Sem 2 GPA" },
        { key: "sem3GPA", label: "Sem 3 GPA" },
        { key: "sem4GPA", label: "Sem 4 GPA" },
        { key: "sem5GPA", label: "Sem 5 GPA" },
        { key: "sem6GPA", label: "Sem 6 GPA" },
        { key: "sem7GPA", label: "Sem 7 GPA" },
        { key: "sem8GPA", label: "Sem 8 GPA" },
        { key: "arrearsSem1", label: "Arrears Sem 1" },
        { key: "arrearsSem2", label: "Arrears Sem 2" },
        { key: "arrearsSem3", label: "Arrears Sem 3" },
        { key: "arrearsSem4", label: "Arrears Sem 4" },
        { key: "arrearsSem5", label: "Arrears Sem 5" },
        { key: "arrearsSem6", label: "Arrears Sem 6" },
        { key: "arrearsSem7", label: "Arrears Sem 7" },
        { key: "arrearsSem8", label: "Arrears Sem 8" }
      ]
    },
    personal: {
      title: "Personal Details",
      fields: [
        { key: "aadhaarNumber", label: "Aadhaar" },
        { key: "alternateEmail", label: "Alt Email" },
        { key: "emergencyContact", label: "Emergency Contact" },
        { key: "primaryMobile", label: "Mobile" },
        { key: "primaryEmail", label: "Primary Email" },
        { key: "nationality", label: "Nationality" },
        { key: "panCard", label: "PAN" },
        { key: "passportNumber", label: "Passport" }
      ]
    },
    family: {
      title: "Family Details",
      fields: [
        { key: "fatherName", label: "Father's Name" },
        { key: "fatherMobile", label: "Father's Mobile" },
        { key: "fatherEmail", label: "Father's Email" },
        { key: "fatherDesignation", label: "Father's Designation" },
        { key: "motherName", label: "Mother's Name" },
        { key: "motherMobile", label: "Mother's Mobile" },
        { key: "motherEmail", label: "Mother's Email" },
        { key: "motherDesignation", label: "Mother's Designation" }
      ]
    },
    address: {
      title: "Address Details",
      fields: [
        { key: "permanentAddress1", label: "Address Line 1" },
        { key: "permanentAddress2", label: "Address Line 2" },
        { key: "permanentCity", label: "City" },
        { key: "permanentPostalCode", label: "Postal Code" },
        { key: "landline", label: "Landline" }
      ]
    },
    cocurricular: {
      title: "Co-curricular",
      fields: [
        { key: "higherStudies", label: "Higher Studies" },
        { key: "becExamGrade", label: "BEC Grade" },
        { key: "becExamStatus", label: "BEC Status" },
        { key: "educationGap", label: "Education Gap" },
        { key: "skillCertifications", label: "Certifications" },
        { key: "languagesKnown", label: "Languages" },
        { key: "sportsQuota", label: "Sports Quota" }
      ]
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/studentsdataforadmin",{
      method: "GET",
  params: { isTrusted: true }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        const studentsData = Array.isArray(data) ? data : data.students || [];
        setStudents(studentsData);
        setFilteredStudents(studentsData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let results = [...students];

    // Search logic
    if (searchTerm.trim() !== "") {
      results = results.filter((student) =>
        (student.firstName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.lastName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.college || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.department || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Arrears history
    if (arrearsHistory) {
      results = results.filter(student =>
        (student.historyOfArrears || "").toLowerCase() === arrearsHistory.toLowerCase()
      );
    }

    // Current arrears
    if (currentArrearsValue !== "") {
      results = results.filter(student => {
        const arrears = Number(student.totalStandingArrears) || 0;
        const filterVal = Number(currentArrearsValue);
        return currentArrearsCompare === "above" ? arrears > filterVal : arrears < filterVal;
      });
    }

    // 10th mark
    if (tenthMark !== "") {
      results = results.filter(student => {
        const mark = Number(student.tenthPercentage) || 0;
        const filterVal = Number(tenthMark);
        return tenthCompare === "above" ? mark > filterVal : mark < filterVal;
      });
    }

    // 12th mark
    if (twelfthMark !== "") {
      results = results.filter(student => {
        const mark = Number(student.twelfthPercentage) || 0;
        const filterVal = Number(twelfthMark);
        return twelfthCompare === "above" ? mark > filterVal : mark < filterVal;
      });
    }

    // Batch filter
    if (selectedBatch) {
      results = results.filter(student => 
        (student.batch || "").toString() === selectedBatch
      );
    }

    setFilteredStudents(results);
  }, [
    searchTerm,
    students,
    arrearsHistory,
    currentArrearsValue,
    currentArrearsCompare,
    tenthMark,
    tenthCompare,
    twelfthMark,
    twelfthCompare,
    selectedBatch
  ]);

  const formatValue = (value) => {
    if (value === null || value === undefined) return '-';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  if (loading) return <div className="status-message">Loading student data...</div>;
  if (error) return <div className="status-message error">Error: {error}</div>;
  if (!students.length) return <div className="status-message">No students found.</div>;

  return (
    <div className="students-data-container">
      <h2>Student Records Management</h2>
      <button onClick={()=> navigate('/AdminDesktop')}>main desktop</button>


      <div className="controls">
        <input
          type="text"
          placeholder="Search by name, email, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filters-container">
        <div className="filters">
          <div className="filter-group">
            <label>
              History of Arrears:
              <select value={arrearsHistory} onChange={(e) => setArrearsHistory(e.target.value)}>
                <option value="">--Any--</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </label>
          </div>

          <div className="filter-group">
            <label>
              Current Arrears:
              <select value={currentArrearsCompare} onChange={(e) => setCurrentArrearsCompare(e.target.value)}>
                <option value="above">Above</option>
                <option value="below">Below</option>
              </select>
              <input
                type="number"
                value={currentArrearsValue}
                onChange={(e) => setCurrentArrearsValue(e.target.value)}
                placeholder="Enter number"
              />
            </label>
          </div>

          <div className="filter-group">
            <label>
              10th Mark:
              <select value={tenthCompare} onChange={(e) => setTenthCompare(e.target.value)}>
                <option value="above">Above</option>
                <option value="below">Below</option>
              </select>
              <input
                type="number"
                value={tenthMark}
                onChange={(e) => setTenthMark(e.target.value)}
                placeholder="10th %"
              />
            </label>
          </div>

          <div className="filter-group">
            <label>
              12th Mark:
              <select value={twelfthCompare} onChange={(e) => setTwelfthCompare(e.target.value)}>
                <option value="above">Above</option>
                <option value="below">Below</option>
              </select>
              <input
                type="number"
                value={twelfthMark}
                onChange={(e) => setTwelfthMark(e.target.value)}
                placeholder="12th %"
              />
            </label>
          </div>

          <div className="filter-group">
            <label>
              Batch:
              <select 
                value={selectedBatch} 
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                <option value="">All Batches</option>
                {availableBatches.map(batch => (
                  <option key={batch} value={batch}>{batch}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="tabs">
        {Object.keys(fieldGroups).map((group) => (
          <button
            key={group}
            className={`tab-button ${activeTab === group ? "active" : ""}`}
            onClick={() => setActiveTab(group)}
          >
            {fieldGroups[group].title}
          </button>
        ))}
      </div>

      <div className="table-scroll-container">
        <table className="student-data-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Student Name</th>
              {fieldGroups[activeTab].fields.map((field, index) => (
                <th key={index}>{field.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, studentIndex) => (
              <tr key={studentIndex}>
                <td>{studentIndex + 1}</td>
                <td className="student-name">
                  {`${student.title || ""} ${student.firstName || ""} ${student.lastName || ""}`.trim()}
                </td>
                {fieldGroups[activeTab].fields.map((field, keyIndex) => (
                  <td key={keyIndex} title={`${field.label}: ${formatValue(student[field.key])}`}>
                    {formatValue(student[field.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Studentsdata;