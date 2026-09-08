import React, { useState } from 'react';
import GreenfieldHeaderBar from "../components/GreenfieldHeaderBar.jsx";

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

function InsertStudentData() {
  const [formData, setFormData] = useState({
    name: '',
    className: '',
    rollNumber: '',
    guardianName: '',
    phone: '',
    email: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://greenfield-academy-back-end.onrender.com/api/insert-student-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to insert student data');
      }

      const result = await response.json();
      setMessage('Student data submitted successfully!');
      
      setFormData({ 
        name: '', 
        className: '', 
        rollNumber: '', 
        guardianName: '', 
        phone: '', 
        email: '' 
      });
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
        <h2 style={styles.title}>Students Registration</h2>
        <p style={styles.subtitle}>Please fill out the student details below</p>
        
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
            <label style={styles.label}>Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Parent / Guardian Name</label>
            <input
              type="text"
              name="guardianName"
              value={formData.guardianName}
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
    margin: '0 auto',
    marginTop: "50px"
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

export default InsertStudentData;