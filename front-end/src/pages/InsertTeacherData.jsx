import React, { useState } from 'react';

function InsertTeacherData() {
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    phone: '',
    email: ''
  });

  const [subjects, setSubjects] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = value;
    setSubjects(updatedSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, '']);
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
      subjects: subjects.filter((sub) => sub.trim() !== '')
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
      
      setFormData({ name: '', qualification: '', phone: '', email: '' });
      setSubjects(['']);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
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
              placeholder=""
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Subjects</label>
            {subjects.map((subject, index) => (
              <div key={index} style={styles.dynamicRow}>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => handleSubjectChange(index, e.target.value)}
                  placeholder="Ex: class-v-social-geography"
                  style={styles.input}
                  required
                />
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
            ))}
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
              placeholder=""
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
              placeholder=""
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
              placeholder=""
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
    padding: '16px', // Reduced padding for smaller screens
    boxSizing: 'border-box'
  },
  card: {
    background: '#ffffff',
    padding: '24px', // Adjusted for mobile view compactness
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    width: '100%',
    maxWidth: '480px',
    boxSizing: 'border-box',
    margin: '0 auto'
  },
  title: {
    margin: '0 0 4px 0',
    fontSize: '22px', // Scaled down slightly for mobile screens
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
    padding: '12px 14px', // Increased touch target height for mobile ergonomics
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '16px', // 16px prevents iOS Safari from auto-zooming on input focus
    color: '#1e293b',
    outline: 'none',
    width: '100%',
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
    padding: '12px 14px', // Matched height with input fields for consistency
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    flexShrink: 0
  },
  submitButton: {
    marginTop: '8px',
    padding: '14px', // Taller button for better mobile tap targets
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