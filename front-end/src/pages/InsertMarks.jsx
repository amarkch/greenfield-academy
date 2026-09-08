import React, { useState, useEffect } from 'react';
import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";

const host = "https://greenfield-academy-back-end.onrender.com";
//const host = "http://localhost:3000";

const CLASS_OPTIONS = [
  "class-i",
  "class-ii",
  "class-iii",
  "class-iv",
  "class-v",
  "class-vi",
  "class-vii",
  "class-viii",
  "class-ix",
  "class-x"
];

const EXAM_OPTIONS = [
  "1st Unit Test",
  "Half Yearly Exam",
  "2nd Unit Test",
  "Annual Exam"
];

function InsertStudentMarks() {
  const [formData, setFormData] = useState({
    className: '',
    subject: '',
    student: '',
    examName: '',
    totalMarks: '',
    acquiredMarks: '',
    remarks: ''
  });

  const [subjectOptions, setSubjectOptions] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!formData.className) {
      setSubjectOptions([]);
      setStudentOptions([]);
      return;
    }

    const fetchDataByClass = async () => {
      setLoadingData(true);
      setMessage('');
      try {
        const res = await fetch(`${host}/api/get-subjects-and-students?className=${formData.className}`);

        if (!res.ok) {
          throw new Error('Failed to fetch subjects or students list for this class');
        }

        const data = await res.json();
        setSubjectOptions(data.subjects || []);
        setStudentOptions(data.students || []);
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      } finally {
        setLoadingData(false);
      }
    };

    fetchDataByClass();
  }, [formData.className]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'className' && { subject: '', student: '' })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`${host}/api/insert-student-marks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to insert student marks');
      }

      await response.json();
      setMessage('Student marks submitted successfully!');
      
      setFormData((prev) => ({
        ...prev,
        subject: '',
        student: '',
        examName: '',
        totalMarks: '',
        acquiredMarks: '',
        remarks: ''
      }));
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{position: "relative"}}>
      <GreenfieldHeaderBar />
      <div style={styles.card}>
        <h2 style={styles.title}>Add Student Marks</h2>
        <p style={styles.subtitle}>Record exam marks and feedback for individual students</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Class</label>
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Select Class</option>
              {CLASS_OPTIONS.map((cls) => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              style={styles.select}
              required
              disabled={!formData.className || loadingData}
            >
              <option value="">
                {!formData.className ? 'Select a class first' : loadingData ? 'Loading...' : 'Select Subject'}
              </option>
              {subjectOptions.map((sub) => (
                <option key={sub._id || sub.subjectName} value={sub._id || sub.subjectName}>
                  {sub.subjectName || sub.name}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Student Name</label>
            <select
              name="student"
              value={formData.student}
              onChange={handleChange}
              style={styles.select}
              required
              disabled={!formData.className || loadingData}
            >
              <option value="">
                {!formData.className ? 'Select a class first' : loadingData ? 'Loading...' : 'Select Student'}
              </option>
              {studentOptions.map((stu) => (
                <option key={stu._id} value={stu._id}>
                  {stu.name} {stu.rollNumber ? `(${stu.rollNumber})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Exam Name</label>
            <select
              name="examName"
              value={formData.examName}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value="">Select Exam</option>
              {EXAM_OPTIONS.map((exam) => (
                <option key={exam} value={exam}>{exam}</option>
              ))}
            </select>
          </div>

          <div style={styles.rowGroup}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Total Marks</label>
              <input
                type="number"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleChange}
                placeholder="100"
                style={styles.input}
                min="0"
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Acquired Marks</label>
              <input
                type="number"
                name="acquiredMarks"
                value={formData.acquiredMarks}
                onChange={handleChange}
                placeholder="85"
                style={styles.input}
                min="0"
                required
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Remarks</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Optional feedback or remarks..."
              style={styles.textarea}
              rows="3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitButton,
              backgroundColor: loading ? '#93c5fd' : '#2563eb',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Submitting...' : 'Save Student Marks'}
          </button>
        </form>

        {message && (
          <div style={{
            ...styles.message,
            backgroundColor: message.startsWith('Error') ? '#fee2e2' : '#dcfce7',
            color: message.startsWith('Error') ? '#b91c1c' : '#15803d'
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    padding: '16px',
    boxSizing: 'border-box'
  },
  card: {
    background: '#ffffff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    width: '100%',
    maxWidth: '560px',
    boxSizing: 'border-box',
    margin: '20px auto',
    marginTop: '50px'
  },
  title: {
    margin: '0 0 4px 0',
    fontSize: '22px',
    fontWeight: '700',
    color: '#0f172a'
  },
  subtitle: {
    margin: '0 0 20px 0',
    fontSize: '13px',
    color: '#64748b'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%'
  },
  rowGroup: {
    display: 'flex',
    gap: '12px'
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  input: {
    padding: '12px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '16px',
    color: '#1e293b',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  },
  select: {
    padding: '12px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '16px',
    color: '#1e293b',
    outline: 'none',
    width: '100%',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box'
  },
  textarea: {
    padding: '12px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '16px',
    color: '#1e293b',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    resize: 'vertical'
  },
  submitButton: {
    marginTop: '8px',
    padding: '14px',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    width: '100%',
    transition: 'background-color 0.2s'
  },
  message: {
    marginTop: '16px',
    padding: '12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center'
  }
};

export default InsertStudentMarks;