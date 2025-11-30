import React, { useState, useEffect } from 'react';
import { addCourse as addCourseAPI, deleteCourse as deleteCourseAPI } from '../services/api';
import './AdminPanel.css';

const AdminPanel = ({ isOpen, onClose, coursesData, onUpdateCourses }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [courses, setCourses] = useState(coursesData);
  const [newCourse, setNewCourse] = useState({
    title: '',
    badge: 'MIT',
    progress: 0,
    status: 'active',
    tags: [],
    image: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Admin credentials
  const ADMIN_EMAIL = 'admin@learningplatform.com';
  const ADMIN_PASSWORD = 'admin123';

  useEffect(() => {
    setCourses(coursesData);
  }, [coursesData]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      if (!newCourse.title.trim()) {
        setError('Course title is required');
        setIsLoading(false);
        return;
      }
      const course = {
        id: Date.now(),
        ...newCourse,
        tags: Array.isArray(newCourse.tags) ? newCourse.tags : newCourse.tags.split(',').map(tag => tag.trim())
      };
      const addedCourse = await addCourseAPI(course);
      const updatedCourses = [...courses, addedCourse];
      setCourses(updatedCourses);
      onUpdateCourses(updatedCourses);
      setNewCourse({ title: '', badge: 'MIT', progress: 0, status: 'active', tags: [], image: '' });
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to add course: ' + (err.message || 'Unknown error'));
      console.error('Error adding course:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCourse = async (courseId) => {
    setError('');
    try {
      await deleteCourseAPI(courseId);
      const updatedCourses = courses.filter(course => course.id !== courseId);
      setCourses(updatedCourses);
      onUpdateCourses(updatedCourses);
    } catch (err) {
      setError('Failed to remove course: ' + (err.message || 'Unknown error'));
      console.error('Error removing course:', err);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  if (!isOpen) return null;

  return (
    <div className="admin-overlay">
      <div className="admin-container">
        <div className="admin-header">
          <h2>🔐 Admin Panel</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {!isAuthenticated ? (
          <div className="admin-login">
            <h3>Admin Login</h3>
            {error && <div className="error-message" style={{color: '#ff6b6b', marginBottom: '10px'}}>{error}</div>}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
            <div className="admin-credentials">
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: admin@learningplatform.com</p>
              <p>Password: admin123</p>
            </div>
          </div>
        ) : (
          <div className="admin-dashboard">
            <div className="admin-actions">
              <button onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? 'Cancel' : 'Add Course'}
              </button>
              <button onClick={handleLogout}>Logout</button>
            </div>

            {error && <div className="error-message" style={{color: '#ff6b6b', marginBottom: '10px', padding: '10px', backgroundColor: '#ffe0e0', borderRadius: '4px'}}>{error}</div>}

            {showAddForm && (
              <div className="add-course-form">
                <h3>Add New Course</h3>
                <form onSubmit={handleAddCourse}>
                  <input
                    type="text"
                    placeholder="Course Title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    required
                  />
                  <select
                    value={newCourse.badge}
                    onChange={(e) => setNewCourse({...newCourse, badge: e.target.value})}
                  >
                    <option value="MIT">MIT</option>
                    <option value="Harvard">Harvard</option>
                    <option value="Stanford">Stanford</option>
                    <option value="Google">Google</option>
                    <option value="IBM">IBM</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Progress %"
                    value={newCourse.progress}
                    onChange={(e) => setNewCourse({...newCourse, progress: parseInt(e.target.value)})}
                    min="0"
                    max="100"
                  />
                  <select
                    value={newCourse.status}
                    onChange={(e) => setNewCourse({...newCourse, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="expired">Expired</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={newCourse.tags}
                    onChange={(e) => setNewCourse({...newCourse, tags: e.target.value})}
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={newCourse.image}
                    onChange={(e) => setNewCourse({...newCourse, image: e.target.value})}
                  />
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Course'}
                  </button>
                </form>
              </div>
            )}

            <div className="courses-list">
              <h3>Manage Courses ({courses.length})</h3>
              {courses.map(course => (
                <div key={course.id} className="course-item">
                  <div className="course-info">
                    <h4>{course.title}</h4>
                    <span className={`badge ${course.badge.toLowerCase()}`}>{course.badge}</span>
                    <span className="progress">{course.progress}%</span>
                    <span className={`status ${course.status}`}>{course.status}</span>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveCourse(course.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;