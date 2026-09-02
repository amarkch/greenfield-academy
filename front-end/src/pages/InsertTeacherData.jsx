import React, { useState } from 'react';
import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";

const CLASS_SUBJECT_MAP = {
  "class-i": ["Mathematics", "English", "Environmental Studies", "Hindi"],
  "class-ii": ["Mathematics", "English", "Environmental Studies", "Hindi"],
  "class-iii": ["Mathematics", "English", "Science", "Social Studies", "Hindi"],
  "class-iv": ["Mathematics", "English", "Science", "Social Studies", "Hindi"],
  "class-v": ["Mathematics", "English", "Science", "Social Science", "Geography", "Hindi"],
  "class-vi": ["Mathematics", "English", "Science", "Social Science", "History", "Geography", "Computer Science", "Hindi"],
  "class-vii": ["Mathematics", "English", "Science", "Social Science", "History", "Geography", "Computer Science", "Hindi"],
  "class-viii": ["Mathematics", "English", "Science", "Social Science", "History", "Geography", "Computer Science", "Hindi"],
  "class-ix": ["Mathematics", "English", "Science", "Physics", "Chemistry", "Biology", "Social Science", "History", "Computer Science"],
  "class-x": ["Mathematics", "English", "Science", "Physics", "Chemistry", "Biology", "Social Science", "History", "Computer Science"]
};

const CLASS_OPTIONS = Object.keys(CLASS_SUBJECT_MAP);

function InsertTeacherData() {
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    phone: '',
    email: '',
    isClassTeacher: false,
    classTeacherOf: ''
  });

  const [subjects, setSubjects] = useState([{ className: '', subjectName: '' }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData((prev) => {
      const updated = { ...prev, [name]: val };
      // Reset classTeacherOf if isClassTeacher is toggled off
      if (name === 'isClassTeacher' && !checked) {
        updated.classTeacherOf = '';
      }
      return updated;
    });
  };

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    
    // Reset subjectName if className changes to prevent mismatched selections
    if (field === 'className') {
      updatedSubjects[index]['subjectName'] = '';
    }

    setSubjects(updatedSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { className: '', subjectName: '' }]);
  };

  const handleRemoveSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const payload = {
      ...formData,
      subjects: subjects
        .filter((sub) => sub.className && sub.subjectName)
        .map((sub) => `[${sub.className}][${sub.subjectName.toLowerCase().replace(/\s+/g, '-')}]`)
    };

    try {
      const response = await fetch('https://greenfield-academy-back-end.onrender.com/api/insert-teacher-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to insert data');
      }

      const result = await response.json();
      setMessage('Data submitted successfully!');
      
      setFormData({ 
        name: '', 
        qualification: '', 
        phone: '', 
        email: '', 
        isClassTeacher: false, 
        classTeacherOf: '' 
      });
      setSubjects([{ className: '', subjectName: '' }]);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <GreenfieldHeaderBar />
      <div style={styles.card}>
        <h2 style={styles.title}>Teachers Registration</h2>
        <p style={styles.subtitle}>Please fill out the details below</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
            <div style={styles.inputGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isClassTeacher"
                checked={formData.isClassTeacher}
                onChange={handleChange}
                style={styles.checkbox}
              />
              Is Class Teacher
            </label>
          </div>

          {formData.isClassTeacher && (
            <div style={styles.inputGroup}>
              <label style={styles.label}>Class Teacher For</label>
              <select
                name="classTeacherOf"
                value={formData.classTeacherOf}
                onChange={handleChange}
                style={styles.select}
                required={formData.isClassTeacher}
              >
                <option value="">Select Class</option>
                {CLASS_OPTIONS.map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          )}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Subjects & Classes</label>
            {subjects.map((item, index) => {
              const availableSubjects = item.className ? CLASS_SUBJECT_MAP[item.className] || [] : [];

              return (
                <div key={index} style={styles.dynamicRow}>
                  <select
                    value={item.className}
                    onChange={(e) => handleSubjectChange(index, 'className', e.target.value)}
                    style={styles.select}
                    required
                  >
                    <option value="">Select Class</option>
                    {CLASS_OPTIONS.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>

                  <select
                    value={item.subjectName}
                    onChange={(e) => handleSubjectChange(index, 'subjectName', e.target.value)}
                    style={{
                      ...styles.select,
                      backgroundColor: !item.className ? '#f1f5f9' : '#ffffff'
                    }}
                    disabled={!item.className}
                    required
                  >
                    <option value="">
                      {item.className ? 'Select Subject' : 'Select Class First'}
                    </option>
                    {availableSubjects.map((sub) => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>

                  {subjects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(index)}
                      style={styles.removeButton}
                    >
                      Remove
                    </button>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={handleAddSubject}
              style={styles.addButton}
            >
              + Add Another Subject
            </button>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Qualification</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

        

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
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
            {loading ? 'Submitting...' : 'Submit Information'}
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
    margin: '0 auto'
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
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#334155',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
    cursor: 'pointer'
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer'
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
  dynamicRow: {
    display: 'flex',
    gap: '8px',
    marginBottom: '6px',
    alignItems: 'center',
    width: '100%'
  },
  addButton: {
    background: 'none',
    border: 'none',
    color: '#2563eb',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '6px 0',
    alignSelf: 'flex-start'
  },
  removeButton: {
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 14px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0
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

export default InsertTeacherData;