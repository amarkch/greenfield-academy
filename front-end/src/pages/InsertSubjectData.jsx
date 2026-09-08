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

function InsertSubjectData() {
  const [formData, setFormData] = useState({
    subjectName: '',
    className: '',
    teacher: '',
    chapters: ['']
  });

  const [teacherOptions, setTeacherOptions] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(`${host}/api/get-teachers-list`);
        if (!response.ok) {
          throw new Error('Failed to fetch teachers list');
        }
        const data = await response.json();
        setTeacherOptions(data);
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      } finally {
        setLoadingTeachers(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChapterChange = (index, value) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters[index] = value;
    setFormData((prev) => ({ ...prev, chapters: updatedChapters }));
  };

  const addChapterField = () => {
    setFormData((prev) => ({ ...prev, chapters: [...prev.chapters, ''] }));
  };

  const removeChapterField = (index) => {
    const updatedChapters = formData.chapters.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, chapters: updatedChapters.length > 0 ? updatedChapters : [''] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const cleanedChapters = formData.chapters.filter((ch) => ch.trim() !== '');
    const payload = {
      ...formData,
      chapters: cleanedChapters
    };

    try {
      const response = await fetch(`${host}/api/insert-subject-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to insert subject data');
      }

      await response.json();
      setMessage('Subject and chapters submitted successfully!');
      
      setFormData({ 
        subjectName: '', 
        className: '', 
        teacher: '',
        chapters: [''] 
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
        <h2 style={styles.title}>Add Subject & Chapters</h2>
        <p style={styles.subtitle}>Define a subject and its corresponding chapters</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Subject Name</label>
            <input
              type="text"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              placeholder="e.g. Mathematics"
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
            <label style={styles.label}>Teacher</label>
            <select
              name="teacher"
              value={formData.teacher}
              onChange={handleChange}
              style={styles.select}
              required
              disabled={loadingTeachers}
            >
              <option value="">{loadingTeachers ? 'Loading teachers...' : 'Select Teacher'}</option>
              {teacherOptions.map((tch) => (
                <option key={tch._id} value={tch._id}>{tch.name}</option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Chapters</label>
            {formData.chapters.map((chapter, index) => (
              <div key={index} style={styles.chapterRow}>
                <input
                  type="text"
                  value={chapter}
                  onChange={(e) => handleChapterChange(index, e.target.value)}
                  placeholder={`Chapter ${index + 1} Name`}
                  style={styles.input}
                  required
                />
                {formData.chapters.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeChapterField(index)}
                    style={styles.removeButton}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addChapterField}
              style={styles.addButton}
            >
              + Add Another Chapter
            </button>
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
            {loading ? 'Submitting...' : 'Save Subject & Chapters'}
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
  chapterRow: {
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    marginBottom: '4px'
  },
  addButton: {
    marginTop: '4px',
    padding: '8px 12px',
    backgroundColor: '#f1f5f9',
    color: '#334155',
    border: '1px dashed #cbd5e1',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    textAlign: 'center'
  },
  removeButton: {
    padding: '12px 14px',
    backgroundColor: '#fee2e2',
    color: '#b91c1c',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer'
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

export default InsertSubjectData;